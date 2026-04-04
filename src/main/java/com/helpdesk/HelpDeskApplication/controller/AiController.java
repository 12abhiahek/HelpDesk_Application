package com.helpdesk.HelpDeskApplication.controller;

import com.helpdesk.HelpDeskApplication.dto.AiRequest;
import com.helpdesk.HelpDeskApplication.dto.ApiResponse;
import com.helpdesk.HelpDeskApplication.service.AiService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for AI-powered help desk operations.
 * Endpoints for chat interactions and ticket summarization.
 */
@RestController
@RequestMapping("/api/v1/ai")
@Slf4j
public class AiController {

    private final AiService aiService;

    /**
     * Constructs AiController with AiService.
     *
     * @param aiService the service for AI operations
     */
    public AiController(final AiService aiService) {
        this.aiService = aiService;
    }

    /**
     * Endpoint for chat with AI assistant.
     * Accepts AiRequest with message and returns AI-generated response.
     *
     * @param request the AI request containing the message
     * @return the AI response wrapped in ApiResponse
     */
    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<String>> chat(@Valid @RequestBody final AiRequest request) {
        try {
            log.info("Processing chat request");
            String response = aiService.generateSolution(request.getMessage());
            
            ApiResponse<String> apiResponse = ApiResponse.success(
                    HttpStatus.OK.value(),
                    "AI response generated successfully",
                    response
            );
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            log.error("Error processing chat request", e);
            ApiResponse<String> apiResponse = (ApiResponse<String>) (ApiResponse<String>) ApiResponse.error(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Error processing your request",
                    e.getMessage()
            );
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to summarize a support ticket or text.
     *
     * @param request the request containing text to summarize
     * @return the summarized text wrapped in ApiResponse
     */
    @PostMapping("/summarize")
    public ResponseEntity<ApiResponse<String>> summarize(@Valid @RequestBody final AiRequest request) {
        try {
            log.info("Processing summarization request");
            String summary = aiService.summarize(request.getMessage());
            
            ApiResponse<String> apiResponse = ApiResponse.success(
                    HttpStatus.OK.value(),
                    "Text summarized successfully",
                    summary
            );
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            log.error("Error processing summarization request", e);
            ApiResponse<String> apiResponse = (ApiResponse<String>) ApiResponse.error(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Error summarizing your text",
                    e.getMessage()
            );
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint to get custom AI assistant response.
     *
     * @param request the request containing prompt for the assistant
     * @return the assistant response wrapped in ApiResponse
     */
    @PostMapping("/assistant")
    public ResponseEntity<ApiResponse<String>> getAssistantResponse(@Valid @RequestBody final AiRequest request) {
        try {
            log.info("Processing assistant request");
            String response = aiService.getResponseFromAssistant(request.getMessage());
            
            ApiResponse<String> apiResponse = ApiResponse.success(
                    HttpStatus.OK.value(),
                    "Assistant response generated successfully",
                    response
            );
            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            log.error("Error getting assistant response", e);
            ApiResponse<String> apiResponse = (ApiResponse<String>) ApiResponse.error(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Error processing your request",
                    e.getMessage()
            );
            return new ResponseEntity<>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
