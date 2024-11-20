import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});

function KeyboardAvoidingScrollLayout<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithScrollLayout(props: T) {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.contentWrapper}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          extraScrollHeight={20}
        >
          <WrappedComponent {...props} />
        </KeyboardAwareScrollView>
      </View>
    );
  };
}

export default KeyboardAvoidingScrollLayout;
