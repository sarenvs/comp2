package com.tweetapp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tweetapp.controller.LoginController;
import com.tweetapp.model.Login;
import com.tweetapp.model.User;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTest {
	

	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private LoginController loginController;
	
	
	
	@Test
	public void registerUser() throws Exception {

		User user = new User();
		user.setUsername("kamal");
		user.setEmail("test123456@gmail.com");
		user.setPassword("123456");
		user.setAge(24);
		user.setSex("male");
		user.setStatus(0);
		this.mockMvc.perform(post("/api/v1.0/tweets/register").content(asJsonString(user))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void login() throws Exception {
		
		Login login = new Login();
		login.setEmail("kamaleshjc003@gmail.com");
		login.setPassword("123456");
		
		this.mockMvc.perform(post("/api/v1.0/tweets/login").content(asJsonString(login))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}

	@Test
	public void logout() throws Exception {
		
		this.mockMvc.perform(post("/api/v1.0/tweets/logout?email=kamaleshjc003@gmail.com"))
		.andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void forgetPassword() throws Exception {
		this.mockMvc.perform(get("/api/v1.0/tweets/test@gmail.com/forgot")).andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void updateUser() throws Exception {
		
		Login login = new Login();
		login.setEmail("test@gmail.com");
		login.setPassword("654321");
		
		this.mockMvc.perform(put("/api/v1.0/tweets/updateUser").content(asJsonString(login))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void getAllUsers() throws Exception {
		this.mockMvc.perform(get("/api/v1.0/tweets/users/all")).andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void getUsersByName() throws Exception {
		this.mockMvc.perform(get("/api/v1.0/tweets/user/search/test@gmail.com")).andDo(print()).andExpect(status().isOk());
	}
	
	public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

	

}
}
