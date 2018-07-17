import React from 'react';
import PropTypes from 'prop-types';

const SocialSharing = ({
  className,
  url,
  title,
  description,
  facebook,
  whatsapp,
  twitter,
  email,
}) => {
  return (
    <div className={className}>
      {facebook && (
        <SharingButton
          type="facebook"
          url={url}
          title={title}
          description={description}
          className={facebook.className}
          icon={facebook.icon}
        />
      )}
      {whatsapp && (
        <SharingButton
          type="whatsapp"
          url={url}
          title={title}
          description={description}
          className={whatsapp.className}
          icon={whatsapp.icon}
        />
      )}
      {twitter && (
        <SharingButton
          type="twitter"
          url={url}
          title={title}
          description={description}
          className={twitter.className}
          icon={twitter.icon}
        />
      )}
      {email && (
        <SharingButton
          type="email"
          url={url}
          title={title}
          description={description}
          className={email.className}
          icon={email.icon}
        />
      )}
    </div>
  );
};

const SharingButton = ({ type, url, title, description, className, icon }) => {
  const openWindow = type !== 'email';
  return (
    <a
      href={getShareURL(type, url, title, description)}
      target={openWindow ? '_blank' : null}
      className={className}
      onClick={
        openWindow
          ? ev => {
              ev.preventDefault();
              openShareWindow(getShareURL(type, url, title, description));
            }
          : null
      }
    >
      {icon}
    </a>
  );
};

const getShareURL = (name, url, title, description) => {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareText = encodeURIComponent(description);
  switch (name) {
    case 'whatsapp':
      return `whatsapp://send?text=${shareTitle}%20${shareUrl}`;
    case 'facebook':
      return `//www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    case 'email':
      return `mailto:?subject=${shareTitle}&body=${shareText}%0D%0A${shareUrl}`;
    case 'twitter':
      return `//twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
  }
};

const openShareWindow = url => {
  window.open(url);
};

SocialSharing.propTypes = {
  /** Main field. The URL to share. */
  url: PropTypes.string.isRequired,

  /** The main text to share. Example: Article Title */
  title: PropTypes.string.isRequired,

  /** The secondary text to share. Example: Article Synopsis */
  description: PropTypes.string.isRequired,

  /** Should include a className and a component for the Facebook button.
   * Nothing renders if left empty. */
  facebook: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),

  /** Should include a className and a component for the WhatsApp button.
   * Nothing renders if left empty. */
  whatsapp: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),

  /** Should include a className and a component for the Twitter button.
   * Nothing renders if left empty. */
  twitter: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),

  /** Should include a className and a component for the Email button.
   * Nothing renders if left empty. */
  email: PropTypes.shape({
    icon: PropTypes.element.isRequired,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),

  /** To style the container of all the buttons */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

SocialSharing.displayName = 'SocialSharing';

export default SocialSharing;
