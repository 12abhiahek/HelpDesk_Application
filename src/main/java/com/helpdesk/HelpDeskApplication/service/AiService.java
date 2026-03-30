package com.helpdesk.HelpDeskApplication.service;

import com.helpdesk.HelpDeskApplication.ai.PromptTemplates;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final ChatClient chatClient;

    public AiService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String generateSolution(String issue) {
        return chatClient.prompt()
                .user(PromptTemplates.SUPPORT_PROMPT(issue))
                .call()
                .content();
    }

    public String summarize(String text) {
        return chatClient.prompt()
                .user(PromptTemplates.SUMMARY_PROMPT(text))
                .call()
                .content();
    }

    public String getResponseFromAssistent(String response) {
        return this.chatClient
                .prompt()
                .user(response)
                .call()
                .content();
    }
}
