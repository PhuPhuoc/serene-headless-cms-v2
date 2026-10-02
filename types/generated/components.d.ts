import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'navigation.link': NavigationLink;
      'navigation.menu-item': NavigationMenuItem;
    }
  }
}
