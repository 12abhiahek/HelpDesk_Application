package com.helpdesk.HelpDeskApplication.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Generic API response wrapper for all endpoints.
 * Ensures consistent response format across all API endpoints.
 *
 * @param <T> the type of data being returned
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    /**
     * HTTP status code
     */
    private int statusCode;

    /**
     * Whether the request was successful
     */
    private boolean success;

    /**
     * Human-readable message
     */
    private String message;

    /**
     * The actual response data
     */
    private T data;

    /**
     * Timestamp of when the response was generated
     */
    private LocalDateTime timestamp;

    /**
     * Error details (if any)
     */
    private String error;

    /**
     * Creates a successful response with data.
     *
     * @param statusCode the HTTP status code
     * @param message the response message
     * @param data the response data
     * @return ApiResponse instance
     */
    public static <T> ApiResponse<T> success(int statusCode, String message, T data) {
        return ApiResponse.<T>builder()
                .statusCode(statusCode)
                .success(true)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Creates a failure response with error details.
     *
     * @param statusCode the HTTP status code
     * @param message the error message
     * @param error the error details
     * @return ApiResponse instance
     */
    public static ApiResponse<?> error(int statusCode, String message, String error) {
        return ApiResponse.builder()
                .statusCode(statusCode)
                .success(false)
                .message(message)
                .error(error)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Creates a success response without data.
     *
     * @param statusCode the HTTP status code
     * @param message the response message
     * @return ApiResponse instance
     */
    public static ApiResponse<?> ok(int statusCode, String message) {
        return ApiResponse.builder()
                .statusCode(statusCode)
                .success(true)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }
}

