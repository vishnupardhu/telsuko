import { check } from "express-validator";

const name = check("name", "Name is required.").not().isEmpty();
const gender = check("gender", "gender is required.").not().isEmpty();
const dob = check("dob", "dob is required.").not().isEmpty();
const country = check("country", "country is required.").not().isEmpty();
const state = check("state", "state is required.").not().isEmpty();
const city = check("city", "city is required.").not().isEmpty();
const phone = check("phone", "phone is required.").not().isEmpty();
const about = check("about", "about is required.").not().isEmpty();
const avatar = check("avatar", "avatar is required.").not().isEmpty();
const profileid = check("profileid", "profileid is required.").not().isEmpty();
const currentuserid = check("currentuserid", "currentuserid is required.").not().isEmpty();
const userid = check("userid", "userid is required.").not().isEmpty();
const username = check("username", "Username is required.").not().isEmpty();
const email = check("email", "Please provide a valid email address").isEmail();
const password = check(
    "password",
    "Password is required of minimum length of 6."
).isLength({
    min: 8,
});

export const RegisterValidations = [password, name, username, email];
export const AuthenticateValidations = [email, password];
export const ResetPassword = [email];
export const profileiid = [profileid];