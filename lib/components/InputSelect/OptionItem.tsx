import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Icons } from '../../assets';
import { useViewStyles } from '../../hooks/useStyles/index';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Container from '../Container';
import Divider from '../Divider';
import Text from '../Text';

type OptionItemPropsType = {
  item: any;
  onSelect: any;
  renderItem: any;
  index: number;
  theme: AppThemeType;
};

const styles = StyleSheet.create({
  optionItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionItemContainer: {
    minHeight: 64,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  optionItemLabel: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'center',
  },
});

const OptionItem: React.FC<OptionItemPropsType> = ({
  item, onSelect, renderItem, index, theme,
}) => {
  const optionItemContainerStyles = useViewStyles(() => [
    styles.optionItemContainer,
    {
      paddingVertical: theme.spacings.sNano,
      paddingHorizontal: theme.spacings.sXXS,
    },
  ], [theme.spacings.sXXS, theme.spacings.sNano]);

  const handlePress = useCallback(() => {
    onSelect(item);
  }, [item, onSelect]);

  const render = () => {
    if (renderItem) {
      return renderItem(item, index);
    }

    return (
      <Container>
        <View style={optionItemContainerStyles}>
          <Text weight="bold" color="neutralGray700" style={styles.optionItemLabel}>
            {item.label}
          </Text>
          <Icons.Small.Right
            width={16}
            height={16}
            color={theme.colors.neutralGray500}
          />
        </View>
        <Divider />
      </Container>
    );
  };

  return (
    <TouchableOpacity testID="item-touchable-render" onPress={handlePress} activeOpacity={theme.opacities.intense}>
      <View style={styles.optionItemWrapper}>
        {render()}
      </View>
    </TouchableOpacity>
  );
};

export default withTheme(OptionItem);
