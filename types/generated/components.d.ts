import type { Schema, Struct } from '@strapi/strapi';

export interface BlockDayAt extends Struct.ComponentSchema {
  collectionName: 'components_block_day_ats';
  info: {
    displayName: 'day-at';
    icon: 'sun';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    heading: Schema.Attribute.Text;
    moments: Schema.Attribute.Component<'shared.day-moment', true>;
  };
}

export interface BlockHero extends Struct.ComponentSchema {
  collectionName: 'components_block_heroes';
  info: {
    displayName: 'hero';
    icon: 'star';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    imageCaption: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'navigation.link', false>;
    secondaryCta: Schema.Attribute.Component<'navigation.link', false>;
    subheadline: Schema.Attribute.String;
  };
}

export interface BlockIntro extends Struct.ComponentSchema {
  collectionName: 'components_block_intros';
  info: {
    displayName: 'intro';
    icon: 'lightbulb';
  };
  attributes: {
    content: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    tags: Schema.Attribute.Component<'shared.tag', true>;
  };
}

export interface BlockSplitSection extends Struct.ComponentSchema {
  collectionName: 'components_block_split_sections';
  info: {
    displayName: 'split-section';
    icon: 'puzzle';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false> &
      Schema.Attribute.Required;
    body: Schema.Attribute.Blocks;
    cta: Schema.Attribute.Component<'navigation.link', false>;
    ctaVariant: Schema.Attribute.Enumeration<['solid-dark', 'solid-light']> &
      Schema.Attribute.DefaultTo<'solid-light'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    heading: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'>;
    imageCaption: Schema.Attribute.String;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
  };
}

export interface NavigationFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_navigation_footer_columns';
  info: {
    displayName: 'footer-column';
    icon: 'bulletList';
  };
  attributes: {
    hidden: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    links: Schema.Attribute.Component<'navigation.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface NavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_navigation_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    modalKey: Schema.Attribute.Enumeration<['contactUs', 'joinMembership']>;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    type: Schema.Attribute.Enumeration<['internal', 'external', 'modal']> &
      Schema.Attribute.DefaultTo<'internal'>;
    url: Schema.Attribute.String;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    displayName: 'menu-item';
    icon: 'bulletList';
  };
  attributes: {
    children: Schema.Attribute.Component<'navigation.link', true>;
    link: Schema.Attribute.Component<'navigation.link', false> &
      Schema.Attribute.Required;
  };
}

export interface SharedBackground extends Struct.ComponentSchema {
  collectionName: 'components_shared_backgrounds';
  info: {
    displayName: 'background';
    icon: 'picture';
  };
  attributes: {
    hexColor: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 8;
        minLength: 3;
      }>;
    image: Schema.Attribute.Media<'images' | 'files'>;
    type: Schema.Attribute.Enumeration<['color', 'image']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'color'>;
  };
}

export interface SharedDayMoment extends Struct.ComponentSchema {
  collectionName: 'components_shared_day_moments';
  info: {
    displayName: 'day-moment';
    icon: 'cloud';
  };
  attributes: {
    cta: Schema.Attribute.Component<'navigation.link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'tag';
    icon: 'priceTag';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'block.day-at': BlockDayAt;
      'block.hero': BlockHero;
      'block.intro': BlockIntro;
      'block.split-section': BlockSplitSection;
      'navigation.footer-column': NavigationFooterColumn;
      'navigation.link': NavigationLink;
      'navigation.menu-item': NavigationMenuItem;
      'shared.background': SharedBackground;
      'shared.day-moment': SharedDayMoment;
      'shared.tag': SharedTag;
    }
  }
}
