import { Borders, BordersType } from '../tokens/borders';
import {
  Colors, ColorsType, ColorsGradients, ColorsGradientsTypes,
} from '../tokens/colors';
import { Opacities, OpacitiesType } from '../tokens/opacities';
import { Shadows, ShadowsType } from '../tokens/shadows';
import { Spacings, SpacingsType } from '../tokens/spacings';
import { Typography, TypographyType } from '../tokens/typography';

export type AppThemeType = {
  borders: BordersType;
  colors: ColorsType;
  colorsGradients: ColorsGradientsTypes;
  opacities: OpacitiesType;
  shadows: ShadowsType;
  spacings: SpacingsType;
  typography: TypographyType;
};

const DefaultTheme: AppThemeType = {
  borders: Borders,
  colors: Colors,
  colorsGradients: ColorsGradients,
  opacities: Opacities,
  shadows: Shadows,
  spacings: Spacings,
  typography: Typography,
};

export default DefaultTheme;
