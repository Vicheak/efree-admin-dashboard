/**
 * Branch Module
 */
export const dashboardAPI = {
  get: "/dashboard/get",
  activityTypeChange: "/dashboard/activity_type_change",
};

/**
 * Branch Module
 */
export const branchAPI = {
  get: "/branch/get",
  get_combo_list: "/branch/get_combo_list",
  store: "/branch/store",
  update: "/branch/update",
  delete: "/branch/delete",
  get_by_id: "branch/get_by_id",
  imagePath: "/branch",
  updateStatus: "/branch/update_status",
};

/**
 * Company Module
 */
export const companyAPI = {
  get: "/company/get",
  store: "/company/store",
  update: "/company/update",
  get_by_id: "company/get_by_id",
  imagePath: "/company",
  delete: "/company/delete",
  updateStatus: "/company/update_status",
};

/**
 * Module Module
 */
export const moduleAPI = {
  get: "/module/get",
  store: "/module/store",
  update: "/module/update",
  delete: "/module/delete",
  get_by_id: "/module/get_by_id",
  sync_module: "/module/sync_module",
};

export const roleAPI = {
  get: "/role/get",
  store: "/role/store",
  update: "/role/update",
  delete: "/role/delete",
  get_by_id: "/role/get_by_id",
  get_update: "/role/get_update",
  getModulePermission: "/role/get_module_permission",
};

/**
 * Module Module
 */
export const userAPI = {
  get: "/user/get",
  store: "/user/store",
  update: "/user/update",
  delete: "/user/delete",
  get_edit: "/user/get_edit",
  get_role: "/user/get_role",
};

/**
 * Module Module
 */
export const userLogAPI = {
  get: "/user_log/get",
};



export const postAPI = {
  get: "/post/get",
  storePostPage: "/post/store_post_page",
  getListUpdate: "/post/get_list_update",
  store: "/post/store",
  update: "/post/update",
  updatePostPage: "/post/update_post_page",
  delete: "/post/delete",
  updateStatus: "/post/update_status",
};

export const currencyApi = {
  get: "/currency/get",
};

export const userDeviceApi = {
  updateToken: "user_device/update_token",
};

export const notificationApi = {
  getNotificationList: "notification/get_list",
  readNotification: "notification/read_message",
  notificationRequest: "notification/notification_request",
  readNotificationRequest: "notification/read_notification_request",
  readAllNotification: "notification/read_all_notification",
  clearAllNotification: "notification/clear_all_notification",
};

export const ipAddressApi = {
  get: "/ipaddress/get",
  store: "/ipaddress/store",
  update: "/ipaddress/update",
  delete: "/ipaddress/delete",
  get_by_id: "/ipaddress/get_by_id",
};

export const categoryAPI = {
  get: "/category/get",
  store: "/category/store",
  update: "/category/update",
  delete: "/category/delete",
  getOne: "/category/get_one",	
};


export const editorAPI = {
  store: "/editor/store",
  update: "/editor/update",
  delete: "/editor/delete",
};

export const bannerAPI = {
  get: "/banner/get",
  store: "/banner/store",
  update: "/banner/update",
  delete: "/banner/delete",
  get_by_id: "/banner/get_by_id",
  updateStatus: "banner/update_status",
};

export const bannerPositionAPI = {
  getBannerByType: "/banner_position/get_banner_by_type",
  get: "/banner_position/get",
  store: "/banner_position/store",
  update: "/banner_position/update",
  delete: "/banner_position/delete",
  updateStatus: "/banner_position/update_status",
};

export const websiteAPI = {
  get: "/website/get",
  store: "/website/store",
  update: "/website/update",
  delete: "/website/delete",
  getList: "/website/get_combo_list",
};

export const questionAPI = {
  get: "/question/get",
  store: "/question/store",
  update: "/question/update",
  delete: "/question/delete",
  get_by_branch_id: "/question/get_by_branch_id",
  updateStatus: "/question/update_status",
  updateOrder: "/question/update_order",
  get_by_category_id: "/question/get_by_category_id",
  get_all: "/question/get_all",
};
export const answerAPI = {
  get: "/answer/get",
  store: "/answer/store",
  update: "/answer/update",
  delete: "/answer/delete",
  get_by_question_id: "answer/get_by_question_id",
  updateStatus: "/answer/update_status",
  updateOrder: "/answer/update_order",
};
export const KDASMenuAPI = {
  get: "/kdas_menu/get",
  store: "/kdas_menu/store",
  update: "/kdas_menu/update",
  delete: "/kdas_menu/delete",
  get_by_id: "/kdas_menu/get_by_id",
  updateStatus: "/kdas_menu/update_status",
};
export const KDACMenuAPI = {
  get: "/kdac_menu/get",
  store: "/kdac_menu/store",
  update: "/kdac_menu/update",
  delete: "/kdac_menu/delete",
  get_by_id: "/kdac_menu/get_by_id",
  updateStatus: "/kdac_menu/update_status",
};

export const charityAPI={
  get: "/charity/get",
  store: "/charity/store",
}

export const blogAPI = {
  get: "/blog/get",
  store: "/blog/store",
  update: "/blog/update",
  updateStatus: "/blog/update_status",
  delete: "/blog/delete",
  getListUpdate: "/blog/get_list_update",
}

export const processAPI = {
  get: "/process/get",
  store: "/process/store",
  update: "/process/update",
  delete: "/process/delete",
}

export const specialtyAPI = {
  get: "/specialty/get",
  store: "/specialty/store",
  update: "/specialty/update",
  delete: "/specialty/delete",
}
export const serviceAPI = {
  get: "/service/get",
  store: "/service/store",
  update: "/service/update",
  updateStatus: "/service/update_status",
  delete: "/service/delete",
  getListUpdate: "/service/get_list_update",
  getByParentID: "/service/get_by_parent_id",
  getAll: "/service/get_all",
}
export const expertiseAPI = {
  get: "/expertise/get",
  store: "/expertise/store",
  update: "/expertise/update",
  delete: "/expertise/delete",
}

export const departmentAPI = {
  get: "/department/get",
  store: "/department/store",
  update: "/department/update",
  delete: "/department/delete",
  getLists: "/department/lists",
}
export const socialMediaAPI = {
  get: "/social_media/get",
  store: "/social_media/store",
  update: "/social_media/update",
  delete: "/social_media/delete",
  getAll: "/social_media/get_all",
};
export const jobPositionAPI = {
  get: "/job_position/get",
  store: "/job_position/store",
  update: "/job_position/update",
  delete: "/job_position/delete",
};
export const KDACTagAPI = {
  get: "/kdac_tag/get",
  store: "/kdac_tag/store",
  update: "/kdac_tag/update",
  delete: "/kdac_tag/delete",
  getLists: "/kdac_tag/lists",
  getAll: "/kdac_tag/get_all",
}
export const viewGalleryAPI = {
  get: "/view_gallery/get",
  store: "/view_gallery/store",
  update: "/view_gallery/update",
  delete: "/view_gallery/delete",
  updateStatus: "/view_gallery/update_status",
}
export const categoryPortfolioAPI = {
  get: "/category_portfolio/get",
  store: "/category_portfolio/store",
  update: "/category_portfolio/update",
  delete: "/category_portfolio/delete",
  getOne: "/category_portfolio/get_one",	
};

export const KDACPortfolioAPI = {
  get: "/kdac_portfolio/get",
  store: "/kdac_portfolio/store",
  update: "/kdac_portfolio/update",
  delete: "/kdac_portfolio/delete",
  updateStatus: "/kdac_portfolio/update_status",
  getListUpdate: "/kdac_portfolio/get_list_update",
  deletePostSocial: "/kdac_portfolio/delete_post_social",
  deletePostTag: "/kdac_portfolio/delete_post_tag",
};

export const employeeAPI = {
  get: "/employee/get",
  store: "/employee/store",
  update: "/employee/update",
  delete: "/employee/delete",
  get_by_id: "/employee/get_by_id",
  getEmpItems:"/employee/get_emp_itmes",
  getEmpById: "/employee/get_emp_id",
}


export const pageAPI = {
  storeOrUpdateHomeSection: "/page/store_or_update_home_section",
  storeOrUpdateCharitySection: "/page/store_or_update_charity_section",
  storeOrUpdateProcessSection: "/page/store_or_update_process_section",
  storeOrUpdateAboutUsSection: "/page/store_or_update_about_us_section",
  storeOrUpdateTheSameSection: "/page/store_or_update_the_same_section",
  getSection: "/page/get_section",
}