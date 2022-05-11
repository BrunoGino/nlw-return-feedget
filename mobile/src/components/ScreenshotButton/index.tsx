import {View, TouchableOpacity, Image} from "react-native";
import {styles} from "./styles";
import {Trash, Camera} from "phosphor-react-native";
import {theme} from "../../theme";

interface Props {
    screenshot: string | null;
    onTakeShot: () => void;
    onRemoveShot: () => void;
}

export function ScreenshotButton({screenshot, onTakeShot, onRemoveShot}: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={screenshot ? onRemoveShot : onTakeShot}
        >
            {
                screenshot ?
                    <View>
                        <Image
                            style={styles.image}
                            source={{uri: screenshot}}
                        />
                        <Trash
                            size={22}
                            color={theme.colors.text_secondary}
                            weight="fill"
                            style={styles.removeIcon}
                        />
                    </View>
                    :
                    <Camera
                        size={22}
                        color={theme.colors.text_primary}
                        weight="bold"
                    />
            }
        </TouchableOpacity>
    );
}