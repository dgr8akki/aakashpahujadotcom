type EventParams = Record<string, string | number>;

export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const analytics = {
  trackMenuClick: (menuItem: string) => {
    trackEvent('menu_click', { menu_item: menuItem });
  },

  trackResumeDownload: () => {
    trackEvent('resume_download', { link_url: '/resume.pdf' });
  },

  trackBlogClick: (slug: string, title: string) => {
    trackEvent('blog_click', { blog_slug: slug, blog_title: title });
  },

  trackTagClick: (tag: string) => {
    trackEvent('tag_click', { tag_name: tag });
  },
};
