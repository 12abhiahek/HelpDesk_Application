package com.helpdesk.HelpDeskApplication.controller;

import com.helpdesk.HelpDeskApplication.dto.AiRequest;
import com.helpdesk.HelpDeskApplication.service.AiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {

    private AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody AiRequest request) {
        return aiService.generateSolution(request.getMessage());
    }



}
