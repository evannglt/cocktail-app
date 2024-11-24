package com.cocktail27.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.cocktail27.api.service.AIService;

import lombok.extern.slf4j.Slf4j;

@Component
@Profile("!test")
@Slf4j
public class AIStartupConfig implements CommandLineRunner {

    @Autowired
    private AIService aiService;

    @Override
    public void run(String... args) throws Exception {
        log.info("Pulling model from Ollama API");
        aiService.pullModel(); // This can take a while
        log.info("Model pulled successfully");
    }
}
