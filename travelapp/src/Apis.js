import axios from "axios";

export let endpoints = {
    "mostviewURL": "/most_view_tour/",
    "destination_all" : '/destination/' ,
    'get_tour_detail_get_cmt' : (tourId) => `/tour_detail/${tourdId}/comment/`,
    "add_cmt": (tourId) => `/tour/${tourId}/add_comment/`,

    "add_rating" : (cmtId) => `/tour/${cmtId}/add_rating/`,
    "get_rating" : (cmtId) => `/tour/${cmtId}/get_rating/`,

    "add_booking" : (bookingid) =>`/tour/${bookingid}/add_booking/`,
    "get_booking_detail_by_user" : `/user/booking_detail/`,
    "update_booking" : (tourId) =>`/tour/${tourId}/update_booking/`,
    
    'all_booking' : '/booking/',


    'get_user_by_id': (userID) =>`/user/${userID}/`,
    'update_info': '/user/update_info/',
    'check_exist': '/user/check_exist/',
    'forgot_password':'/user/forgot_password/',
    'uppdate_booking_user':'/user/update_booking/',
    'cancel_booking_user':'/user/cancel_booking/',

    'update_staff' : (userID) =>  `/staff/${userID}/`,
    'add_staff' : `/staff/`,


    'current_user': '/user/current_user/',
    'login': '/o/token/',
    "oauth2-info": '/oauth2-info/',
    "get_tag_blog" : "/tag_blog/",
    "tour_detail_all" : '/tour/',
    'register': '/user/',
    'get_all_user': '/user/',
    'get_transport' : '/transport/',
    'get_view' : '/view/get_view/',
    'inc_view' : '/view/inc_view/',
    'get_all_view' : '/view/',
}


export let AuthAPI = axios.create({
    baseURL: 'https://etravel12.pythonanywhere.com',
    headers: {
        'Authorization': `Bearer ${cookies.load('access_token')}`
    }
})

export default axios.create({
    baseURL: "https://etravel12.pythonanywhere.com"
})