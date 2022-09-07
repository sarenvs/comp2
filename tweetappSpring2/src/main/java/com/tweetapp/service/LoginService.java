package com.tweetapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.model.Login;
import com.tweetapp.model.User;
import com.tweetapp.repository.LoginRepository;

@Service
public class LoginService {
	
	@Autowired
	LoginRepository loginRepository;
	
	public String registerUser(User user) throws Exception {
		
		List<User> userList = checkUser(user.getEmail());
		if(!userList.isEmpty()) {
			throw new Exception(userList.get(0).getEmail()+ " is already available in database! Please enter the new email!...");
		}
		User usr =loginRepository.save(user);
		if(usr.getUsername()!=null) {
			return "registered!";
		}
		return null;
	}
	
	public List<User> checkUser(String email) {
		
		return loginRepository.findByEmail(email);
	}

	public User login(Login login) throws Exception {
		
		
		List<User> userList =loginRepository.findByEmailAndPassword(login.getEmail(), login.getPassword());
		
		if(userList.isEmpty()) {
			throw new Exception("Please check your crdentials!");
		}
		
		userList.get(0).setStatus(1);
		
		
		return loginRepository.save(userList.get(0));
		
	}
	
	public String logout(String email) throws Exception {
		List<User> userList = loginRepository.findByEmail(email);
		
		if(userList.isEmpty()) {
			throw new Exception("We couldn't find your email");
		}
		
		userList.get(0).setStatus(0);
		loginRepository.save(userList.get(0));
		
		return "logged out";
	}
	
	public List<User> getAllUsers(){
		
		List<User> userLists = loginRepository.findAll();
		
		return userLists;
	}
	
	public List<User> getUsersByName(String username) {
		
		List<User> userLists = loginRepository.findByUsername(username);
		
		return userLists;
	}
	
	public User forgetPassword(String email) throws Exception {
		
		List<User> userList = loginRepository.findByEmail(email);
		
		if(userList.isEmpty()) {
			throw new Exception("Please check your email!");
		}
		
		return userList.get(0);
	}
	
	public User updateUser(Login login) {
		
		List<User> userList = loginRepository.findByEmail(login.getEmail());
		
		userList.get(0).setPassword(login.getPassword());

		return loginRepository.save(userList.get(0));
	}
	
	
}
