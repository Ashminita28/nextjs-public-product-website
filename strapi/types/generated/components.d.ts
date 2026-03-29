import type { Schema, Struct } from '@strapi/strapi';

export interface LandingCapability extends Struct.ComponentSchema {
  collectionName: 'components_landing_capabilities';
  info: {
    displayName: 'capability';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface LandingModule extends Struct.ComponentSchema {
  collectionName: 'components_landing_modules';
  info: {
    displayName: 'module';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    name: Schema.Attribute.String;
  };
}

export interface PricingFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_pricing_feature_items';
  info: {
    displayName: 'feature-item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    primary_cta_link: Schema.Attribute.String;
    primary_cta_text: Schema.Attribute.String;
    secondary_cta_link: Schema.Attribute.String;
    secondary_cta_text: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedProblem extends Struct.ComponentSchema {
  collectionName: 'components_shared_problems';
  info: {
    displayName: 'problem';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    points: Schema.Attribute.Component<'shared.problem-point', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedProblemPoint extends Struct.ComponentSchema {
  collectionName: 'components_shared_problem_points';
  info: {
    displayName: 'problem-point';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface SharedSolution extends Struct.ComponentSchema {
  collectionName: 'components_shared_solutions';
  info: {
    displayName: 'solution';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'stat';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'landing.capability': LandingCapability;
      'landing.module': LandingModule;
      'pricing.feature-item': PricingFeatureItem;
      'shared.hero': SharedHero;
      'shared.problem': SharedProblem;
      'shared.problem-point': SharedProblemPoint;
      'shared.solution': SharedSolution;
      'shared.stat': SharedStat;
    }
  }
}
