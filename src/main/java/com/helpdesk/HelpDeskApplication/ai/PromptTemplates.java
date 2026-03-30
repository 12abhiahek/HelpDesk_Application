package com.helpdesk.HelpDeskApplication.ai;

public class PromptTemplates {

    public static String SUPPORT_PROMPT(String issue) {
        return "You are a professional IT helpdesk assistant. Provide a clear solution for: " + issue;
    }

    public static String SUMMARY_PROMPT(String text) {
        return "Summarize this support ticket in 2 lines: " + text;
    }
}
