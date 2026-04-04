package com.helpdesk.HelpDeskApplication.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

/**
 * Application configuration properties.
 * Maps environment variables to strongly-typed configuration beans.
 */
@Configuration
@ConfigurationProperties(prefix = "app")
@Data
public class AppProperties {

    private DatabaseConfig database = new DatabaseConfig();
    private AiConfig ai = new AiConfig();
    private ServerConfig server = new ServerConfig();
    private LogConfig logging = new LogConfig();

    /**
     * Database configuration properties.
     */
    @Data
    public static class DatabaseConfig {
        private String url;
        private String username;
        private String password;
        private String driverClassName;
        private PoolConfig pool = new PoolConfig();

        /**
         * Connection pool configuration.
         */
        @Data
        public static class PoolConfig {
            private Integer maximumPoolSize = 20;
            private Integer minimumIdle = 5;
            private Long connectionTimeout = 20000L;
            private Long idleTimeout = 300000L;
            private Long maxLifetime = 1200000L;
        }
    }

    /**
     * AI service configuration properties.
     */
    @Data
    public static class AiConfig {
        private String apiKey;
        private String baseUrl;
        private ModelConfig model = new ModelConfig();

        /**
         * AI model configuration.
         */
        @Data
        public static class ModelConfig {
            private String name = "mixtral-8x7b-32768";
            private Double temperature = 0.7;
            private Integer maxTokens = 1000;
        }
    }

    /**
     * Server configuration properties.
     */
    @Data
    public static class ServerConfig {
        private Integer port = 8080;
        private String contextPath = "/";
        private Boolean enableCors = true;
        private String[] allowedOrigins = {"*"};
    }

    /**
     * Logging configuration properties.
     */
    @Data
    public static class LogConfig {
        private String level = "INFO";
        private String filePath = "logs/helpdesk-application.log";
        private String maxFileSize = "10MB";
        private Integer maxHistory = 30;
    }
}

