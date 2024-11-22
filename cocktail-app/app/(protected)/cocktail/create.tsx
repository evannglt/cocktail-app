import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import MultilineTextInputComponent from "@/components/MultilineTextInputComponent";
import KeyboardAvoidingScrollLayout from "@/layout/KeyboardAvoidingScrollLayout";
import DynamicTextInput from "@/components/DynamicTextInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 10,
  },
  closeIcon: {
    position: "absolute",
    left: 16,
    zIndex: 99,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  image: {
    width: "87%",
    height: 250,
    marginVertical: 10,
    borderRadius: 4,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.lightOrange,
  },
  toggleAlcoholicContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  chipText: {
    color: "white",
    fontWeight: "bold",
  },
  alcoholicChip: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.pastelRed,
    marginHorizontal: 10,
  },
  nonAlcoholicChip: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.light.pastelGreen,
    marginHorizontal: 10,
  },
  shareButtonContainer: {
    width: "87%",
    backgroundColor: Colors.light.orange,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 25,
    opacity: 1,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  shareButtonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 15,
  },
});

const CreateCocktail: React.FC = () => {
  const [title, setTitle] = useState("");
  const [glass, setGlass] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [quantities, setQuantities] = useState<string[]>([""]);
  const [steps, setSteps] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);

  const handleAddIngredient = () => {
    handleAddItem(setIngredients);
    handleAddItem(setQuantities);
  };

  const handleRemoveIngredient = (index: number) => {
    handleRemoveItem(index, setIngredients);
    handleRemoveItem(index, setQuantities);
  };

  const handleAddItem = (
    setItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setItems((prevItems) => [...prevItems, ""]);
  };

  const handleRemoveItem = (
    index: number,
    setItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    text: string,
    setItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = text;
      return updatedItems;
    });
  };

  const isSharingEnabled = () => {
    return (
      title.trim() !== "" &&
      glass.trim() !== "" &&
      description.trim() !== "" &&
      ingredients.every((ingredient) => ingredient.trim() !== "") &&
      quantities.every((quantity) => quantity.trim() !== "") &&
      steps.every((step) => step.trim() !== "") &&
      tags.every((tag) => tag.trim() !== "")
    );
  };

  const handleSharePressed = async () => {
    router.back();
  };

  const [isAlcoholic, setIsAlcoholic] = useState(true);

  const handleChipPress = (type: boolean) => {
    setIsAlcoholic(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()} style={styles.closeIcon}>
          <AntDesign name="close" size={30} color="black" />
        </Pressable>
        <Text style={styles.title}>Create Recipe</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity activeOpacity={0.5} style={styles.image}>
          <AntDesign name="plus" size={45} color={Colors.light.orange} />
        </TouchableOpacity>

        <MultilineTextInputComponent
          title="Title"
          placeholder="Add title..."
          value={title}
          onChange={setTitle}
        />

        <MultilineTextInputComponent
          title="Glass Type"
          placeholder="Add glass type..."
          value={glass}
          onChange={setGlass}
        />

        <MultilineTextInputComponent
          title="Description"
          placeholder="Add your description..."
          value={description}
          onChange={setDescription}
          height={175}
        />
        <DynamicTextInput
          title="Ingredient"
          items={ingredients}
          secondaryItems={quantities}
          onAdd={handleAddIngredient}
          onChange={(index, text) =>
            handleItemChange(index, text, setIngredients)
          }
          onSecondaryChange={(index, text) =>
            handleItemChange(index, text, setQuantities)
          }
          onRemove={handleRemoveIngredient}
        />

        <DynamicTextInput
          title="Step"
          items={steps}
          onAdd={() => handleAddItem(setSteps)}
          onChange={(index, text) => handleItemChange(index, text, setSteps)}
          onRemove={(index) => handleRemoveItem(index, setSteps)}
        />

        <DynamicTextInput
          title="Tag"
          items={tags}
          onAdd={() => handleAddItem(setTags)}
          onChange={(index, text) => handleItemChange(index, text, setTags)}
          onRemove={(index) => handleRemoveItem(index, setTags)}
        />

        <View style={styles.toggleAlcoholicContainer}>
          <Pressable
            onPress={() => handleChipPress(true)}
            style={[styles.alcoholicChip, { opacity: isAlcoholic ? 1 : 0.5 }]}
          >
            <Text style={styles.chipText}>Alcoholic</Text>
          </Pressable>
          <Pressable
            onPress={() => handleChipPress(false)}
            style={[
              styles.nonAlcoholicChip,
              { opacity: !isAlcoholic ? 1 : 0.5 },
            ]}
          >
            <Text style={styles.chipText}>Non-Alcoholic</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleSharePressed}
          style={styles.shareButtonContainer}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome6
              name="martini-glass-citrus"
              size={17}
              color={"white"}
            />
            <Text
              style={[
                styles.shareButtonText,
                { opacity: isSharingEnabled() ? 1 : 0.5 },
              ]}
              disabled={!isSharingEnabled()}
            >
              Share your recipe
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingScrollLayout(CreateCocktail);
