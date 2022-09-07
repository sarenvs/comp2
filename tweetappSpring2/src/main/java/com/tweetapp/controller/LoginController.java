package com.tweetapp.controller;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.model.Login;
import com.tweetapp.model.User;
import com.tweetapp.service.LoginService;

import io.micrometer.core.annotation.Timed;

@RestController
@RequestMapping("/api/v1.0/tweets")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
	
	@Autowired
	LoginService loginService;
	
	
	@Timed(value = "monitoring.register.request",histogram = true, percentiles = {0.95,0.99},extraTags= {"version","1.0"})
	@PostMapping("/register")
	public String registerUser(@RequestBody User user) throws Exception {
		return loginService.registerUser(user);
	}
	
	@Timed(value = "monitoring.login.request",histogram = true, percentiles = {0.95,0.99},extraTags= {"version","1.0"})
	@PostMapping("/login")
	public User login(@RequestBody Login login) throws Exception {
		
		return loginService.login(login);
	}

	@Timed(value = "monitoring.logout.request",histogram = true, percentiles = {0.95,0.99},extraTags= {"version","1.0"})
	@PostMapping("/logout")
	public String logout(@RequestParam String email) throws Exception {
		
		return loginService.logout(email);
	}
	
	@Timed(value = "monitoring.forgot.request",histogram = true, percentiles = {0.95,0.99},extraTags= {"version","1.0"})
	@GetMapping("/{email}/forgot")
	public User forgetPassword(@PathVariable String email) throws Exception {
		
		return loginService.forgetPassword(email);
	}
	
	@Timed(value = "monitoring.updateUser.request",histogram = true, percentiles = {0.95,0.99},extraTags= {"version","1.0"})
	@PutMapping("/updateUser")
	public User updateUser(@RequestBody Login login) {
		
		return loginService.updateUser(login);
	}
	
	@Timed(value = "monitoring.users.request",histogram = true, percentiles = {0.95,0.99},extraTags= {"version","1.0"})
	@GetMapping("/users/all")
	public List<User> getAllUsers() {
		return loginService.getAllUsers();
	}
	
	@Timed(value = "monitoring.search.request",histogram = true, percentiles = {0.95,0.99},extraTags= {"version","1.0"})
	@GetMapping("/user/search/{username}")
	public List<User> getUsersByName(@PathVariable String username) {
		
		return loginService.getUsersByName(username);
	}
	

}
