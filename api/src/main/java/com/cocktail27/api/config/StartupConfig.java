package com.cocktail27.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.cocktail27.api.service.StartupService;

@Component
@Profile("!test")
public class StartupConfig implements CommandLineRunner {
    @Autowired
    private StartupService startupService;

    @Override
    public void run(String... args) throws Exception {
        startupService.init();
    }
}
