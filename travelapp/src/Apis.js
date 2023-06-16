import axios from "axios";
import cookies from 'react-cookies';

export let endpoints = {
    "banner": '/banners/',
    "mostviewURL": "/most_view_tour/",
    "destination" : '/destination/' ,

    "departure": "/departure/",
    'tour': '/tour/',
    'tour-detail' : (tourId) => `/tour/${tourId}/`,
    
    "add_booking" : (tourId) =>`/tour/${tourId}/checkout/`,

    "addTourViewURL" : tourId => `/tour/${tourId}/views/`,
    "add_cmt": (tourId) => `/tour/${tourId}/add_comment/`,

    "add_rating" : (cmtId) => `/tour/${cmtId}/add_rating/`,
    "get_rating" : (cmtId) => `/tour/${cmtId}/get_rating/`,

    "get_booking_by_user" : `/users/booking-detail/`,
    "update_booking" : (tourId) =>`/tour/${tourId}/update_booking/`,
    
    'all_booking' : '/booking/',

    'current_user': '/users/current-user/',
    'get_user_by_id': (userID) =>`/users/${userID}/`,
    'update_info': '/users/update_info/',
    'change_password': '/users/change-password/',
    'check_exist': '/users/check_exist/',
    'forgot_password':'/users/forgot-password/',
    'update_booking_user':'/users/update_booking/',
    'cancel_booking':'/users/cancel_booking/',

    'update_staff' : (userID) =>  `/staff/${userID}/`,
    'add_staff' : `/staff/`,


    

    'login': '/o/token/',
    "oauth2-info": '/oauth2-info/',
    "get_tag_blog" : "/tag_blog/",
    'register': '/users/',
    'get_all_user': '/users/',
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
    baseURL: "https://etravel12.pythonanywhere.com",
    
})