import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useImageViewerModal } from './ImageViewerModal.hooks';
import { STRINGS } from './ImageViewerModal.strings';

export default function ImageViewerModal({
  activeViewerImage,
  setActiveViewerImage,
}) {
  const { styles } = useImageViewerModal();

  return (
    <Modal
      visible={!!activeViewerImage}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setActiveViewerImage(null)}
    >
      <View style={styles.viewerOverlay}>
        <TouchableOpacity
          style={styles.viewerCloseBtn}
          onPress={() => setActiveViewerImage(null)}
        >
          <Ionicons name="close" size={30} color="#FFFFFF" />
        </TouchableOpacity>

        {activeViewerImage && (
          <View style={styles.viewerContent}>
            <Image
              source={{ uri: activeViewerImage.imageUrl || activeViewerImage.url || activeViewerImage.image_url }}
              style={styles.viewerImage}
            />
            <View style={styles.viewerCaptionBox}>
              <Text style={styles.viewerCaptionText}>
                {activeViewerImage.caption || STRINGS.noCaption}
              </Text>
              {activeViewerImage.accessibility && (
                <View style={styles.viewerBadgeRow}>
                  <Text style={styles.viewerBadge}>
                    {activeViewerImage.accessibility === 'shared'
                      ? STRINGS.sharedBadge
                      : STRINGS.privateBadge}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
