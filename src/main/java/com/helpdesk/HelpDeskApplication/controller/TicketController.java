package com.helpdesk.HelpDeskApplication.controller;

import com.helpdesk.HelpDeskApplication.dto.ApiResponse;
import com.helpdesk.HelpDeskApplication.dto.TicketRequest;
import com.helpdesk.HelpDeskApplication.entity.Ticket;
import com.helpdesk.HelpDeskApplication.service.TicketService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for ticket management.
 * Provides endpoints for creating, retrieving, and managing support tickets.
 */
@RestController
@RequestMapping("/api/v1/tickets")
@Slf4j
public class TicketController {

    private final TicketService ticketService;

    /**
     * Constructs TicketController with TicketService.
     *
     * @param ticketService the service for ticket operations
     */
    public TicketController(final TicketService ticketService) {
        this.ticketService = ticketService;
    }

    /**
     * Creates a new support ticket.
     *
     * @param ticketRequest the ticket details
     * @return ResponseEntity with the created ticket
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Ticket>> createTicket(
            @Valid @RequestBody final TicketRequest ticketRequest) {
        try {
            log.info("Creating new ticket for user: {}", ticketRequest.getUsername());
            Ticket ticket = ticketService.createTicket(ticketRequest);
            
            ApiResponse<Ticket> response = ApiResponse.success(
                    HttpStatus.CREATED.value(),
                    "Ticket created successfully",
                    ticket
            );
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error creating ticket", e);
            throw e;
        }
    }

    /**
     * Retrieves a ticket by its ID.
     *
     * @param ticketId the ID of the ticket
     * @return ResponseEntity with the ticket details
     */
    @GetMapping("/{ticketId}")
    public ResponseEntity<ApiResponse<Ticket>> getTicket(
            @PathVariable final Long ticketId) {
        try {
            log.info("Fetching ticket with ID: {}", ticketId);
            Ticket ticket = ticketService.getTicketById(ticketId);
            
            ApiResponse<Ticket> response = ApiResponse.success(
                    HttpStatus.OK.value(),
                    "Ticket retrieved successfully",
                    ticket
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error retrieving ticket", e);
            throw e;
        }
    }

    /**
     * Retrieves all tickets for a specific user.
     *
     * @param username the username
     * @return ResponseEntity with list of tickets
     */
    @GetMapping("/user/{username}")
    public ResponseEntity<ApiResponse<Ticket>> getTicketByUsername(
            @PathVariable final String username) {
        try {
            log.info("Fetching ticket for user: {}", username);
            Ticket ticket = ticketService.getTicketByUsername(username);
            
            ApiResponse<Ticket> response = ApiResponse.success(
                    HttpStatus.OK.value(),
                    "Ticket retrieved successfully",
                    ticket
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error retrieving ticket for user", e);
            throw e;
        }
    }

    /**
     * Retrieves all tickets.
     *
     * @return ResponseEntity with list of all tickets
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Ticket>>> getAllTickets() {
        try {
            log.info("Fetching all tickets");
            List<Ticket> tickets = ticketService.getAllTickets();
            
            ApiResponse<List<Ticket>> response = ApiResponse.success(
                    HttpStatus.OK.value(),
                    "All tickets retrieved successfully",
                    tickets
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error retrieving all tickets", e);
            throw e;
        }
    }

    /**
     * Updates a ticket.
     *
     * @param ticketId the ID of the ticket to update
     * @param ticketRequest the updated ticket details
     * @return ResponseEntity with the updated ticket
     */
    @PutMapping("/{ticketId}")
    public ResponseEntity<ApiResponse<Ticket>> updateTicket(
            @PathVariable final Long ticketId,
            @Valid @RequestBody final TicketRequest ticketRequest) {
        try {
            log.info("Updating ticket with ID: {}", ticketId);
            Ticket ticket = ticketService.updateTicket(ticketId, ticketRequest);
            
            ApiResponse<Ticket> response = ApiResponse.success(
                    HttpStatus.OK.value(),
                    "Ticket updated successfully",
                    ticket
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error updating ticket", e);
            throw e;
        }
    }

    /**
     * Deletes a ticket.
     *
     * @param ticketId the ID of the ticket to delete
     * @return ResponseEntity with success message
     */
    @DeleteMapping("/{ticketId}")
    public ResponseEntity<ApiResponse<?>> deleteTicket(
            @PathVariable final Long ticketId) {
        try {
            log.info("Deleting ticket with ID: {}", ticketId);
            ticketService.deleteTicket(ticketId);
            
            ApiResponse<?> response = ApiResponse.ok(
                    HttpStatus.OK.value(),
                    "Ticket deleted successfully"
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error deleting ticket", e);
            throw e;
        }
    }
}

