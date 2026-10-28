import type { Schema, Struct } from '@strapi/strapi';

export interface BlockArtAndCulture extends Struct.ComponentSchema {
  collectionName: 'components_block_art_and_cultures';
  info: {
    displayName: 'art-and-culture';
    icon: 'picture';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    cta: Schema.Attribute.Component<'navigation.link', false>;
    exhibition: Schema.Attribute.Component<'shared.exhibition', false>;
    eyebrowe: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Art & Culture'>;
  };
}

export interface BlockClubEvents extends Struct.ComponentSchema {
  collectionName: 'components_block_club_events';
  info: {
    displayName: 'club-event';
    icon: 'music';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Club Events'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    limit: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<7>;
    note: Schema.Attribute.Text;
    primaryCta: Schema.Attribute.Component<'navigation.link', false>;
    secondaryCta: Schema.Attribute.Component<'navigation.link', false>;
  };
}

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

export interface BlockMembership extends Struct.ComponentSchema {
  collectionName: 'components_block_memberships';
  info: {
    displayName: 'membership';
    icon: 'alien';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'membership'>;
    features: Schema.Attribute.Component<'shared.features', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.Component<'navigation.link', false>;
    secondaryCta: Schema.Attribute.Component<'navigation.link', false>;
  };
}

export interface BlockPrivateEvent extends Struct.ComponentSchema {
  collectionName: 'components_block_private_events';
  info: {
    displayName: 'private-event';
    icon: 'lock';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    description: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Private Event'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.Component<'navigation.link', false>;
    secondaryCta: Schema.Attribute.Component<'navigation.link', false>;
  };
}

export interface BlockSimpleSection extends Struct.ComponentSchema {
  collectionName: 'components_block_simple_sections';
  info: {
    displayName: 'simple-section';
    icon: 'expand';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false> &
      Schema.Attribute.Required;
    body: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'navigation.link', false>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'>;
    imageCaption: Schema.Attribute.String;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'left'>;
  };
}

export interface BlockStay extends Struct.ComponentSchema {
  collectionName: 'components_block_stays';
  info: {
    displayName: 'stay';
    icon: 'gate';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    cta: Schema.Attribute.Component<'navigation.link', false>;
    description: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'The Stay Collection'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    includesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Every residence includes'>;
    yourStayLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Your stay'>;
  };
}

export interface BlockTier extends Struct.ComponentSchema {
  collectionName: 'components_block_tiers';
  info: {
    displayName: 'tier';
    icon: 'priceTag';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Tiers'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.Text;
    primaryCta: Schema.Attribute.Component<'navigation.link', false>;
    secondaryCta: Schema.Attribute.Component<'navigation.link', false>;
    tiers: Schema.Attribute.Component<'shared.pricing-tier', true>;
  };
}

export interface BlockVisit extends Struct.ComponentSchema {
  collectionName: 'components_block_visits';
  info: {
    displayName: 'visit';
    icon: 'paperPlane';
  };
  attributes: {
    address: Schema.Attribute.Text;
    directionsCta: Schema.Attribute.Component<'navigation.link', false>;
    email: Schema.Attribute.Email;
    emailPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Email address'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'visit'>;
    heading: Schema.Attribute.Text & Schema.Attribute.Required;
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
    mapEmbedUrl: Schema.Attribute.String;
    mapImage: Schema.Attribute.Media<'images' | 'files'>;
    newsletterText: Schema.Attribute.String;
    note: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    pinSubtitle: Schema.Attribute.String;
    pinTitle: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Subscribe'>;
    zaloUrl: Schema.Attribute.String;
  };
}

export interface BlockWellnessAndLeisure extends Struct.ComponentSchema {
  collectionName: 'components_block_wellness_and_leisures';
  info: {
    displayName: 'wellness-and-leisure';
    icon: 'walk';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    bentos: Schema.Attribute.Component<'shared.bento', true>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Wellness & Leisure'>;
    heading: Schema.Attribute.String;
  };
}

export interface BlockWineAndDine extends Struct.ComponentSchema {
  collectionName: 'components_block_wine_and_dines';
  info: {
    displayName: 'wine-and-dine';
    icon: 'cup';
  };
  attributes: {
    background: Schema.Attribute.Component<'shared.background', false>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Dine & Wine'>;
    heading: Schema.Attribute.String;
    venues: Schema.Attribute.Component<'shared.card', true>;
  };
}

export interface JournalGalleryBlock extends Struct.ComponentSchema {
  collectionName: 'components_journal_gallery_blocks';
  info: {
    displayName: 'gallery-block';
    icon: 'landscape';
  };
  attributes: {
    caption: Schema.Attribute.String;
    images: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
    layout: Schema.Attribute.Enumeration<
      ['carousel', 'masonry-2', 'masonry-3']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'carousel'>;
  };
}

export interface JournalImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_journal_image_blocks';
  info: {
    displayName: 'image-block';
    icon: 'landscape';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface JournalRichTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_journal_rich_text_blocks';
  info: {
    displayName: 'rich-text-block';
    icon: 'bold';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    fontSize: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 30;
          min: 5;
        },
        number
      >;
  };
}

export interface JournalTwoColumnBlock extends Struct.ComponentSchema {
  collectionName: 'components_journal_two_column_blocks';
  info: {
    displayName: 'two-column-block';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']>;
  };
}

export interface JournalVideoBlock extends Struct.ComponentSchema {
  collectionName: 'components_journal_video_blocks';
  info: {
    displayName: 'video-block';
    icon: 'monitor';
  };
  attributes: {
    caption: Schema.Attribute.String;
    isExternalVideo: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    url: Schema.Attribute.String;
    video: Schema.Attribute.Media<'files' | 'videos'>;
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
    ctaBehavior: Schema.Attribute.Enumeration<
      ['internal', 'external', 'modal']
    > &
      Schema.Attribute.DefaultTo<'internal'>;
    ctaVariant: Schema.Attribute.Enumeration<
      ['none', 'solid', 'outline', 'underline']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    modalKey: Schema.Attribute.Enumeration<['contactUs', 'joinMembership']>;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    page: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>;
    url: Schema.Attribute.String;
    withIcon: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
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
    type: Schema.Attribute.Enumeration<['default', 'color', 'image']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'default'>;
  };
}

export interface SharedBento extends Struct.ComponentSchema {
  collectionName: 'components_shared_bentos';
  info: {
    displayName: 'bento';
    icon: 'gift';
  };
  attributes: {
    defaultHexColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#9A7B66'>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    images: Schema.Attribute.Media<'images' | 'files', true>;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'card';
    icon: 'puzzle';
  };
  attributes: {
    cta: Schema.Attribute.Component<'navigation.link', false>;
    ctaStyle: Schema.Attribute.Enumeration<['button', 'link']> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'>;
    imageCaption: Schema.Attribute.String;
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

export interface SharedExhibition extends Struct.ComponentSchema {
  collectionName: 'components_shared_exhibitions';
  info: {
    displayName: 'exhibition';
    icon: 'plane';
  };
  attributes: {
    artistName: Schema.Attribute.String & Schema.Attribute.Required;
    coverImage: Schema.Attribute.Media<'images' | 'files', true>;
    cta: Schema.Attribute.Component<'navigation.link', false>;
    curatorialNote: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.Date & Schema.Attribute.Required;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatures extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'feature';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPricingTier extends Struct.ComponentSchema {
  collectionName: 'components_shared_pricing_tiers';
  info: {
    displayName: 'pricing-tier';
    icon: 'priceTag';
  };
  attributes: {
    description: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    period: Schema.Attribute.String;
    price: Schema.Attribute.BigInteger;
    priceLabel: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u20AB'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'cursor';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String;
    noIndex: Schema.Attribute.Boolean;
    ogImage: Schema.Attribute.Media<'images' | 'files'>;
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
      'block.art-and-culture': BlockArtAndCulture;
      'block.club-events': BlockClubEvents;
      'block.day-at': BlockDayAt;
      'block.hero': BlockHero;
      'block.intro': BlockIntro;
      'block.membership': BlockMembership;
      'block.private-event': BlockPrivateEvent;
      'block.simple-section': BlockSimpleSection;
      'block.stay': BlockStay;
      'block.tier': BlockTier;
      'block.visit': BlockVisit;
      'block.wellness-and-leisure': BlockWellnessAndLeisure;
      'block.wine-and-dine': BlockWineAndDine;
      'journal.gallery-block': JournalGalleryBlock;
      'journal.image-block': JournalImageBlock;
      'journal.rich-text-block': JournalRichTextBlock;
      'journal.two-column-block': JournalTwoColumnBlock;
      'journal.video-block': JournalVideoBlock;
      'navigation.footer-column': NavigationFooterColumn;
      'navigation.link': NavigationLink;
      'navigation.menu-item': NavigationMenuItem;
      'shared.background': SharedBackground;
      'shared.bento': SharedBento;
      'shared.card': SharedCard;
      'shared.day-moment': SharedDayMoment;
      'shared.exhibition': SharedExhibition;
      'shared.features': SharedFeatures;
      'shared.pricing-tier': SharedPricingTier;
      'shared.seo': SharedSeo;
      'shared.tag': SharedTag;
    }
  }
}
