import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import '../fonts/material-symbols.css';

// Icon gallery component
interface IconGalleryProps {
  iconStyle: 'outlined' | 'rounded' | 'sharp';
  icons: string[];
}

const IconGallery = ({ iconStyle, icons }: IconGalleryProps) => {
  const iconStyleClass = `material-symbols-${iconStyle}`;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '24px',
        padding: '24px',
        maxWidth: '1200px',
      }}
    >
      {icons.map((iconName) => (
        <div
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
            e.currentTarget.style.borderColor = '#118ab2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}
        >
          <span
            className={iconStyleClass}
            style={{
              fontSize: '32px',
              color: 'var(--color-icon-primary)',
            }}
          >
            {iconName}
          </span>
          <span
            style={{
              fontSize: '12px',
              color: '#6d6d6d',
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              wordBreak: 'break-word',
            }}
          >
            {iconName}
          </span>
        </div>
      ))}
    </div>
  );
};

// Comprehensive Material Symbols icon set
// Material 3 includes 2,500+ icons - this is an extended subset covering major categories
const allIcons = [
  // Navigation & Actions (Common)
  'home', 'search', 'menu', 'close', 'arrow_back', 'arrow_forward', 'arrow_upward', 'arrow_downward',
  'chevron_left', 'chevron_right', 'expand_more', 'expand_less', 'unfold_more', 'unfold_less',
  'first_page', 'last_page', 'navigate_before', 'navigate_next', 'refresh', 'sync', 'cached',
  'open_in_new', 'open_in_full', 'fullscreen', 'fullscreen_exit', 'zoom_in', 'zoom_out',
  'apps', 'grid_view', 'view_list', 'view_module', 'view_column', 'view_agenda', 'dashboard',
  'more_vert', 'more_horiz', 'menu_open', 'drag_indicator', 'drag_handle',

  // User & Account
  'person', 'account_circle', 'face', 'group', 'people', 'supervisor_account', 'switch_account',
  'person_add', 'person_remove', 'login', 'logout', 'manage_accounts', 'badge', 'contact_page',
  'recent_actors', 'contacts', 'engineering', 'support_agent', 'admin_panel_settings',

  // Communication
  'mail', 'email', 'inbox', 'send', 'forward_to_inbox', 'mark_email_read', 'mark_email_unread',
  'drafts', 'mail_outline', 'markunread', 'outbox', 'unsubscribe', 'move_to_inbox',
  'phone', 'call', 'call_end', 'dialpad', 'voicemail', 'contact_phone', 'phone_in_talk',
  'message', 'chat', 'chat_bubble', 'comment', 'forum', 'question_answer', 'feedback',
  'sms', 'textsms', 'speaker_notes', 'campaign', 'announcement',

  // Content & Files
  'folder', 'folder_open', 'create_new_folder', 'snippet_folder', 'folder_shared',
  'description', 'article', 'note', 'sticky_note_2', 'text_snippet', 'assignment',
  'file_copy', 'content_copy', 'content_cut', 'content_paste', 'file_present',
  'attach_file', 'attachment', 'link', 'insert_link', 'link_off', 'add_link',
  'cloud', 'cloud_upload', 'cloud_download', 'cloud_done', 'cloud_sync', 'cloud_off',
  'upload', 'download', 'upload_file', 'download_for_offline', 'file_download', 'file_upload',

  // Media & Images
  'image', 'photo', 'photo_camera', 'camera_alt', 'add_photo_alternate', 'photo_library',
  'collections', 'burst_mode', 'panorama', 'filter', 'image_search', 'crop', 'rotate_right',
  'flip', 'tune', 'palette', 'brush', 'color_lens', 'gradient', 'auto_fix_high',
  'movie', 'video_library', 'videocam', 'play_circle', 'play_arrow', 'pause', 'stop',
  'skip_next', 'skip_previous', 'fast_forward', 'fast_rewind', 'replay', 'repeat', 'shuffle',
  'volume_up', 'volume_down', 'volume_off', 'volume_mute', 'mic', 'mic_off', 'headphones',

  // Editing & Formatting
  'edit', 'edit_note', 'mode_edit', 'draw', 'create', 'stylus', 'border_color',
  'format_bold', 'format_italic', 'format_underlined', 'format_size', 'format_color_text',
  'format_align_left', 'format_align_center', 'format_align_right', 'format_align_justify',
  'format_list_bulleted', 'format_list_numbered', 'format_quote', 'format_indent_increase',
  'text_fields', 'title', 'subject', 'notes', 'spellcheck', 'translate',

  // Actions & Status
  'add', 'add_circle', 'add_box', 'remove', 'remove_circle', 'block', 'do_not_disturb',
  'check', 'check_circle', 'check_box', 'done', 'done_all', 'verified', 'task_alt',
  'cancel', 'clear', 'close', 'highlight_off', 'unpublished', 'disabled_by_default',
  'delete', 'delete_forever', 'delete_outline', 'restore_from_trash', 'backspace',
  'save', 'save_as', 'archive', 'unarchive', 'inventory', 'inventory_2',
  'star', 'star_border', 'star_half', 'star_rate', 'grade', 'favorite', 'favorite_border',
  'bookmark', 'bookmark_border', 'bookmarks', 'bookmark_add', 'bookmark_remove',
  'flag', 'outlined_flag', 'assistant_photo', 'label', 'label_important', 'new_label',

  // Notifications & Alerts
  'notifications', 'notifications_active', 'notifications_none', 'notifications_off',
  'notification_important', 'add_alert', 'error', 'error_outline', 'warning', 'warning_amber',
  'info', 'info_outline', 'help', 'help_outline', 'report', 'report_problem', 'priority_high',
  'campaign', 'crisis_alert', 'emergency', 'doorbell', 'alarm', 'alarm_on', 'timer',

  // Settings & Configuration
  'settings', 'settings_suggest', 'tune', 'build', 'construction', 'handyman',
  'admin_panel_settings', 'manage_accounts', 'security', 'privacy_tip', 'shield',
  'vpn_key', 'key', 'password', 'lock', 'lock_open', 'lock_clock', 'no_encryption',
  'visibility', 'visibility_off', 'remove_red_eye', 'preview', 'pageview',

  // Commerce & Shopping
  'shopping_cart', 'shopping_bag', 'add_shopping_cart', 'remove_shopping_cart', 'storefront',
  'store', 'local_mall', 'loyalty', 'card_giftcard', 'redeem', 'receipt', 'receipt_long',
  'payment', 'credit_card', 'account_balance', 'savings', 'currency_exchange', 'point_of_sale',
  'shopping_basket', 'sell', 'price_check', 'discount', 'local_offer', 'new_releases',

  // Time & Calendar
  'schedule', 'access_time', 'alarm', 'timer', 'hourglass_empty', 'hourglass_full',
  'calendar_today', 'event', 'event_available', 'event_busy', 'date_range', 'calendar_month',
  'today', 'upcoming', 'history', 'update', 'query_builder', 'pending', 'pending_actions',

  // Location & Maps
  'location_on', 'place', 'pin_drop', 'add_location', 'my_location', 'gps_fixed', 'gps_off',
  'map', 'satellite', 'layers', 'terrain', 'explore', 'navigation', 'directions', 'near_me',
  'location_city', 'home_work', 'apartment', 'house', 'cottage', 'domain', 'business',

  // Travel & Transport
  'flight', 'flight_takeoff', 'flight_land', 'local_airport', 'connecting_airports',
  'directions_car', 'directions_bus', 'directions_subway', 'directions_train', 'directions_bike',
  'directions_walk', 'directions_run', 'local_shipping', 'local_taxi', 'departure_board',
  'commute', 'emoji_transportation', 'ev_station', 'local_gas_station', 'traffic',

  // Devices & Hardware
  'computer', 'laptop', 'phone_android', 'phone_iphone', 'tablet', 'tablet_mac', 'watch',
  'desktop_windows', 'devices', 'smartphone', 'speaker', 'headset', 'keyboard', 'mouse',
  'print', 'scanner', 'router', 'wifi', 'bluetooth', 'usb', 'cable', 'battery_full',
  'memory', 'storage', 'sd_card', 'sim_card', 'developer_board', 'sensors',

  // UI & Display
  'brightness_high', 'brightness_low', 'brightness_4', 'brightness_auto', 'dark_mode', 'light_mode',
  'contrast', 'invert_colors', 'opacity', 'tonality', 'blur_on', 'flare', 'wb_sunny',
  'screen_rotation', 'screen_lock_rotation', 'stay_current_portrait', 'stay_current_landscape',
  'crop', 'crop_square', 'crop_free', 'straighten', 'transform', 'aspect_ratio',

  // Social & Sharing
  'share', 'ios_share', 'screen_share', 'cast', 'cast_connected', 'rss_feed', 'public',
  'language', 'web', 'alternate_email', 'import_contacts', 'group_add', 'person_add_alt',
  'thumbs_up_down', 'thumb_up', 'thumb_down', 'sentiment_satisfied', 'emoji_emotions',

  // Data & Analytics
  'analytics', 'insights', 'assessment', 'bar_chart', 'pie_chart', 'show_chart', 'trending_up',
  'trending_down', 'trending_flat', 'equalizer', 'data_usage', 'donut_large', 'query_stats',
  'leaderboard', 'table_chart', 'table_rows', 'view_timeline', 'timeline', 'scatter_plot',

  // Development & Code
  'code', 'terminal', 'integration_instructions', 'data_object', 'javascript', 'css', 'html',
  'bug_report', 'build_circle', 'webhook', 'api', 'dataset', 'database', 'cloud_queue',
  'dns', 'http', 'cloud_circle', 'token', 'schema', 'science', 'psychology',

  // Health & Medical
  'local_hospital', 'medical_services', 'health_and_safety', 'healing', 'medication',
  'vaccines', 'science', 'biotech', 'coronavirus', 'masks', 'sanitizer', 'monitor_heart',

  // Entertainment & Games
  'sports_esports', 'videogame_asset', 'casino', 'nightlife', 'theater_comedy', 'local_movies',
  'music_note', 'library_music', 'album', 'audiotrack', 'piano', 'guitar', 'mic_external_on',

  // Food & Dining
  'restaurant', 'local_dining', 'fastfood', 'local_pizza', 'lunch_dining', 'dinner_dining',
  'breakfast_dining', 'local_cafe', 'local_bar', 'liquor', 'cake', 'icecream', 'emoji_food_beverage',

  // Weather & Nature
  'wb_sunny', 'wb_cloudy', 'ac_unit', 'grain', 'thunderstorm', 'water_drop', 'air', 'wind_power',
  'eco', 'energy_savings_leaf', 'park', 'forest', 'nature', 'nature_people', 'spa',

  // Sports & Fitness
  'fitness_center', 'sports', 'pool', 'sports_basketball', 'sports_soccer', 'sports_tennis',
  'golf_course', 'skateboarding', 'snowboarding', 'surfing', 'kayaking', 'hiking', 'self_improvement',

  // Miscellaneous
  'extension', 'lightbulb', 'emoji_objects', 'tips_and_updates', 'psychology', 'school',
  'military_tech', 'workspace_premium', 'verified_user', 'gavel', 'balance', 'policy',
  'copyright', 'fingerprint', 'qr_code', 'qr_code_scanner', 'barcode_reader', 'nfc',
  'pets', 'cruelty_free', 'volunteer_activism', 'favorite', 'heart_broken', 'diversity_3',
];

const meta = {
  title: 'Foundations/Icons',
  component: IconGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Material Symbols icon gallery showcasing all three font variants.

## Usage
To use these icons in your components, import the material-symbols.css file and apply the appropriate class:

\`\`\`tsx
import '../../fonts/material-symbols.css';

// In your component
<span className="material-symbols-sharp">home</span>
<span className="material-symbols-rounded">settings</span>
<span className="material-symbols-outlined">favorite</span>
\`\`\`

## Variants
- **Sharp**: Clean, angular edges (default)
- **Rounded**: Soft, rounded edges
- **Outlined**: Stroke-based, hollow icons
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconStyle: {
      control: 'select',
      options: ['outlined', 'rounded', 'sharp'],
      description: 'Icon style variant',
    },
  },
} satisfies Meta<typeof IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

// Searchable icon gallery
const SearchableIconGallery = ({ iconStyle }: { iconStyle: 'outlined' | 'rounded' | 'sharp' }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const iconStyleClass = `material-symbols-${iconStyle}`;

  const filteredIcons = React.useMemo(() => {
    if (!searchTerm) return allIcons;
    return allIcons.filter((icon) =>
      icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style={{ padding: '24px', maxWidth: '1400px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '8px', fontFamily: 'system-ui, sans-serif', fontSize: '24px' }}>
          Material Symbols - {iconStyle.charAt(0).toUpperCase() + iconStyle.slice(1)}
        </h2>
        <p style={{ color: '#6d6d6d', fontSize: '14px', marginBottom: '16px' }}>
          {filteredIcons.length} of {allIcons.length} icons
          {searchTerm && ` matching "${searchTerm}"`}
        </p>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search icons... (e.g., home, settings, mail)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '12px 16px',
            fontSize: '14px',
            border: '1px solid #d6d6d6',
            borderRadius: '8px',
            fontFamily: 'system-ui, sans-serif',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#118ab2';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#d6d6d6';
          }}
        />
      </div>

      {/* Icon Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredIcons.map((iconName) => (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 8px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigator.clipboard.writeText(iconName);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.borderColor = '#118ab2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#e0e0e0';
            }}
            title={`Click to copy: ${iconName}`}
          >
            <span
              className={iconStyleClass}
              style={{
                fontSize: '32px',
                color: 'var(--color-icon-primary)',
              }}
            >
              {iconName}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: '#6d6d6d',
                textAlign: 'center',
                fontFamily: 'monospace',
                wordBreak: 'break-word',
                lineHeight: '1.2',
              }}
            >
              {iconName}
            </span>
          </div>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '48px',
            color: '#6d6d6d',
            fontSize: '14px',
          }}
        >
          No icons found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export const Sharp: Story = {
  render: () => <SearchableIconGallery iconStyle="sharp" />,
  parameters: {
    docs: {
      description: {
        story: 'Sharp variant with clean, angular edges. Click any icon to copy its name. Over 500+ commonly used Material Symbols icons.',
      },
    },
  },
};

export const Rounded: Story = {
  render: () => <SearchableIconGallery iconStyle="rounded" />,
  parameters: {
    docs: {
      description: {
        story: 'Rounded variant with soft, friendly edges. Click any icon to copy its name.',
      },
    },
  },
};

export const Outlined: Story = {
  render: () => <SearchableIconGallery iconStyle="outlined" />,
  parameters: {
    docs: {
      description: {
        story: 'Outlined variant with stroke-based, hollow icons. Click any icon to copy its name.',
      },
    },
  },
};

// Comparison view showing all three styles side by side
const IconComparison = () => {
  const comparisonIcons = ['home', 'settings', 'favorite', 'notifications', 'person', 'search'];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: '24px', fontFamily: 'system-ui, sans-serif' }}>
        Icon Style Comparison
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
        }}
      >
        {['sharp', 'rounded', 'outlined'].map((style) => (
          <div key={style}>
            <h3
              style={{
                marginBottom: '16px',
                fontFamily: 'system-ui, sans-serif',
                textTransform: 'capitalize',
                color: '#118ab2',
              }}
            >
              {style}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {comparisonIcons.map((icon) => (
                <div
                  key={icon}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                >
                  <span
                    className={`material-symbols-${style}`}
                    style={{
                      fontSize: '32px',
                      color: 'var(--color-icon-primary)',
                    }}
                  >
                    {icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Comparison: Story = {
  render: () => <IconComparison />,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all three icon styles.',
      },
    },
  },
};
