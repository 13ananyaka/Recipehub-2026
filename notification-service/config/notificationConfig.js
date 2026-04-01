const notificationTypes = {
  ORDER_STATUS: 'order_status',
  RECIPE_APPROVED: 'recipe_approved',
  RECIPE_REJECTED: 'recipe_rejected',
  GENERAL: 'general'
};

const notificationTemplates = {
  [notificationTypes.ORDER_STATUS]: {
    title: 'Order Status Update',
    message: 'Your order status has been updated to {status}'
  },
  [notificationTypes.RECIPE_APPROVED]: {
    title: 'Recipe Approved',
    message: 'Your recipe "{recipeTitle}" has been approved and is now live!'
  },
  [notificationTypes.RECIPE_REJECTED]: {
    title: 'Recipe Rejected',
    message: 'Your recipe "{recipeTitle}" has been rejected. Please review the guidelines.'
  },
  [notificationTypes.GENERAL]: {
    title: 'Notification',
    message: '{message}'
  }
};

const getNotificationTemplate = (type, variables = {}) => {
  const template = notificationTemplates[type];
  if (!template) {
    return notificationTemplates[notificationTypes.GENERAL];
  }

  let title = template.title;
  let message = template.message;

  // Replace variables in the template
  Object.keys(variables).forEach(key => {
    const placeholder = `{${key}}`;
    title = title.replace(new RegExp(placeholder, 'g'), variables[key]);
    message = message.replace(new RegExp(placeholder, 'g'), variables[key]);
  });

  return { title, message };
};

module.exports = {
  notificationTypes,
  notificationTemplates,
  getNotificationTemplate
};
