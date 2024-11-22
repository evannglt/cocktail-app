package com.cocktail27.api.service;

public class PfpService {
    public static String getPfpURL(String name) {
        return "https://eu.ui-avatars.com/api/?name=" + name.replace(" ", "+")
                + "&background=c36f06&color=fff&size=250";
    }
}
