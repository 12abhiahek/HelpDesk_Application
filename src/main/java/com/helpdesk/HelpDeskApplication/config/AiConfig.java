package com.helpdesk.HelpDeskApplication.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiConfig {


    private ChatClient chatClient;
    @Bean
    public ChatClient getChatClient(ChatClient.Builder chatClientBuilder) {
        chatClient = chatClientBuilder
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .build();

        return chatClient;
    }
}
