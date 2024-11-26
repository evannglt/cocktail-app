# Developer / Design Diary

- Examples of developer/design „moments“, about 2 per week, per team
- Major issues or discussions
- Design decisions
- Roughly 6-8 total, about 2-5 sentences each
- Markdown format
- Submission, for instance
- Separate file diary.md
- Link labelled „Diary“ in readme.md pointing to online resource, e.g., in Atlassian Confluence

### Design (Figma), Front-End & Back-End

Here's the link to the [figma](https://www.figma.com/design/q6rvJkeqv7Oey1XEYGqQT1/Cocktail-Recipes-App?node-id=0-1&m=dev&t=FulShdGOdrEr1YUN-1) (some changes were directly implemented and not (re)designed for time constraints reasons).

Here's the link to the [JIRA](https://tcd-team-cocktail27.atlassian.net/jira/software/projects/COC/boards/1).

#### Week 1

- Created most of the pages from a template. We started with the easier ones: _Login Page_, _Home Page_, _Profile Page_.

- Chose a range of colors; we agreed on an orange theme.

**Issues:**

- Getting used to Figma and understanding how to create frames/components/icons was challenging and time consuming at the beginning.
- We set up the project 1 day before Expo switched to SDK 52, which prevented us from using Expo Go. We had to update the project to SDK 52 and fix some issues with the dependencies.

#### Week 2

- Designed the other pages (_Other People's Profile_, _Create Recipe_, _Favorites Page_).

- Discussed add-ons like _Likes & Comments_ and _Search by Ingredients_ but agreed they were not a priority and would only be designed (and eventually implemented) if time allowed.

- Evaluated the use of Toasters for feedback in the UI, but this was deprioritized and added to the backlog due to project time constraints.

###### Front-End issues

- Concerned that implementing all the pages _and_ the add-ons might be too complex within the available time.
- Small bug with the Scroll View inside a Safe Area View not expanding to the bottom of it. Put in the sprint to-do list.
- Small bug with the picture of the log-in page with smaller phones. Since then, we test on a simulator of multiple devices to make sure the design is as compatible as possible.
- Design for the _Other User's recipes_, but no way in the UI to access it. Added a profile picture in the Recipe page of a cocktail.

###### Back-End issues

- For the CI/CD pipeline, we had some troubles with the startup actions of the Spring Boot application. We found a solution by using profiles in the test classes and removing the startup actions when testing. Moreover, we had to use a specific configuration using **H2** (in memory database) and not the PostgreSQL database when testing, as this would throw errors when being executed in the Gitlab runner.
- Concerning tests, some annotations from Spring Boot were crashing the tests. We had to remove them and use the **@SpringBootTest** annotation instead.

#### Week 3

- While implementing the _Create a Recipe_ page, we realized that we chose to make the user inputs for quantities and ingredients based on pre-defined options. However, database wise, it's not the case. We thus adjusted the design to include free-form inputs for better usability.

- Explored the `strTags` in the API response and incorporated them as visual Chips on cocktail recipes. Eventually, those Chips should be pressable to search cocktails by tags, but same thing as before, won't be implemented because of the time constraints.

- Realised we completely forgot about the 'Steps' (and later on, when we included the Tags, we forgot about adding them as well) part of the recipe. Decided not to loose time on the Figma and directly implement it as we all had pretty much the same idea in mind for it.

- Also added the number of reviews next to the stars representing the score of a cocktail. Thus, we had to think and implement a way to rate a cocktail. We agreed on pressable stars in the recipe page.

###### Front-End issues

- Aligning design with real-world data from the API was trickier than anticipated due to inconsistencies in data formatting.
- Design was adapted multiple times, as well as implementation. For instance, the initial design had subcategories of ingredients (alcohol, juice, garnish), but the API doesn't give that. We decided to simplify the design and remove those subcategories altogether.

###### Back-End issues

- We had some issues with the JPA entities, because of their relationships, and chose to use the **@Transactional** annotation as well as **cascades** to solve them. This was a good solution, but we had to be careful with the use of it, as it could lead to some problems in the future.

#### Week 4

- Last design implementations (_search_ page) and adjustements (logic changes on the _edit profile_ page, adding some more information about the cocktail such as the glass it should be poured in and if it is alcoholic or not).
- Implementation of the generation of a complete recipe from a cocktail name using Ollama API. We chose to use llama3.2:1b (1 billion parameters), one of the smallest models, because it was the smallest one that could fit on many computers, since it is running locally. As a comparison, GPT-3 has 175 billion parameters, and GPT-4o has around 1.6 trillion parameters, so the results are not as good as those models, but still good enough (most of the time) for our use case.

###### Front-End issues

- There's no 'description' in the external API response, so we decided on putting the category of the drink instead.

###### Back-End issues

- We decided to populate the database with 100 random cocktails from the external API at startup, but the API only allows 60 request every 10 seconds, so we limited our populating service to 50 cocktails.
- Sometimes, the response from Ollama is not valid and it throws an error on the frontend, we didn't have time to fix this issue. 
- For Ollama, multiple things that could have be done include: changing the temperature of the model (to ensure 2 identical requests give the same output), changing the model, or changing the prompt to the model. Also, we could have created a model from another one by tweaking the parameters using the Modelfile, but this would have taken too much time to determine the most optimal parameters.
