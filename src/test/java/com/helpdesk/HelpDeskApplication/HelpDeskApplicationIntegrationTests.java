package com.helpdesk.HelpDeskApplication;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the Help Desk Application.
 * Tests all major endpoints and functionality.
 */
@SpringBootTest
@AutoConfigureMockMvc
class HelpDeskApplicationIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    /**
     * Tests that the application context loads successfully.
     */
    @Test
    void contextLoads() {
        // Test passes if application context loads without errors
    }

    /**
     * Tests the health check endpoint.
     */
    @Test
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/actuator/health"))
                .andExpect(status().isOk());
    }

    /**
     * Tests creating a ticket with valid data.
     */
    @Test
    void testCreateTicketSuccess() throws Exception {
        String ticketJson = """
                {
                    "title": "Test Issue",
                    "description": "This is a test ticket description for testing purposes",
                    "priority": "HIGH",
                    "username": "testuser"
                }
                """;

        mockMvc.perform(post("/api/v1/tickets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ticketJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").exists());
    }

    /**
     * Tests creating a ticket with invalid data.
     */
    @Test
    void testCreateTicketValidationError() throws Exception {
        String invalidTicketJson = """
                {
                    "title": "Test",
                    "description": "Short",
                    "priority": "HIGH",
                    "username": "testuser"
                }
                """;

        mockMvc.perform(post("/api/v1/tickets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidTicketJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    /**
     * Tests AI chat endpoint with valid request.
     */
    @Test
    void testAiChatSuccess() throws Exception {
        String aiRequestJson = """
                {
                    "message": "How do I fix my network connectivity issue?"
                }
                """;

        mockMvc.perform(post("/api/v1/ai/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content(aiRequestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists());
    }

    /**
     * Tests AI chat endpoint with empty message.
     */
    @Test
    void testAiChatValidationError() throws Exception {
        String emptyRequestJson = """
                {
                    "message": ""
                }
                """;

        mockMvc.perform(post("/api/v1/ai/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content(emptyRequestJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false));
    }

    /**
     * Tests retrieving all tickets endpoint.
     */
    @Test
    void testGetAllTickets() throws Exception {
        mockMvc.perform(get("/api/v1/tickets")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    /**
     * Tests 404 endpoint not found error handling.
     */
    @Test
    void testNotFoundError() throws Exception {
        mockMvc.perform(get("/api/v1/nonexistent")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}

