import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/Tooltip.css';

const Tooltip = ({ 
  message, 
  type = 'warning', 
  onClose, 
  visible = false,
  position = 'top',
  duration = null,
  icon = null
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
      
      if (duration) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [visible, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); 
  };

  const getTooltipStyle = () => {
    switch (type) {
      case 'warning':
        return {
          containerClass: 'tooltip-warning',
          icon: icon || faExclamationTriangle,
          iconColor: '#cc5500' // Orange-red
        };
      case 'info':
        return {
          containerClass: 'tooltip-info',
          icon: icon || faInfoCircle,
          iconColor: '#0066cc' // Blue
        };
      case 'error':
        return {
          containerClass: 'tooltip-error',
          icon: icon || faTimesCircle,
          iconColor: '#cc0000' // Red
        };
      case 'custom':
        return {
          containerClass: 'tooltip-custom',
          icon: icon || faInfoCircle,
          iconColor: '#333333' // Dark gray
        };
      default:
        return {
          containerClass: 'tooltip-warning',
          icon: icon || faExclamationTriangle,
          iconColor: '#cc5500' // Orange-red
        };
    }
  };

  const tooltipStyle = getTooltipStyle();
  const tooltipClasses = `tooltip-container ${tooltipStyle.containerClass} tooltip-${position} ${isVisible ? 'tooltip-visible' : ''}`;

  return (
    <div className={tooltipClasses}>
      <div className="tooltip-content">
        <div className="tooltip-icon">
          <FontAwesomeIcon icon={tooltipStyle.icon} style={{ color: tooltipStyle.iconColor }} />
        </div>
        <div className="tooltip-message">{message}</div>
        <button className="tooltip-close" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimesCircle} style={{ color: tooltipStyle.iconColor }}/>
        </button>
      </div>
    </div>
  );
};

export default Tooltip;