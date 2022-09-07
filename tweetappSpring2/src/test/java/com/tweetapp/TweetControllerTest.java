package com.tweetapp;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tweetapp.controller.TweetController;
import com.tweetapp.model.Login;
import com.tweetapp.model.Reply;
import com.tweetapp.model.Tweet;

@SpringBootTest
@AutoConfigureMockMvc
public class TweetControllerTest {
	
	@Autowired
	private MockMvc mockMvc;
	
	@Autowired
	private TweetController tweetController;
	
	@Test
	public void getAllTweets() throws Exception {
		this.mockMvc.perform(get("/api/v1.0/tweets/all")).andDo(print()).andExpect(status().isOk());
	}
	
	
	@Test
	public void getAllTweetsByUser() throws Exception {
		this.mockMvc.perform(get("/api/v1.0/tweets/kamaleshjc003@gmail.com")).andDo(print()).andExpect(status().isOk());
	}
	

	@Test
	public void postTweet() throws Exception {
		
		Tweet tweet = new Tweet();
		tweet.setUsername("test");
		tweet.setEmail("test@gmail.com");
		String tweets = "hi";
		tweet.setTweets(tweets);
		
		this.mockMvc.perform(post("/api/v1.0/tweets/test@gmail.com/add").content(tweets)
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void updateTweet() throws Exception {
		
		String tweet ="hello guys!";
		
	this.mockMvc.perform(put("/api/v1.0/tweets/test@gmail.com/update/62a81a417bc1457902dfead6").content(tweet)
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void deleteTweet() throws Exception {
		this.mockMvc.perform(delete("/api/v1.0/tweets/test@gmail.com/delete/62a81cc287ddaa4788f2db42")).andDo(print()).andExpect(status().isOk());
	}
	
	
	@Test
	public void likeTweet() throws Exception {
		
		
	this.mockMvc.perform(put("/api/v1.0/tweets/test@gmail.com/like/62a81d1584903a587187b32c")
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}
	
	@Test
	public void disLikeTweet() throws Exception {
				
	this.mockMvc.perform(put("/api/v1.0/tweets/test@gmail.com/dislike/62a81d1584903a587187b32c")
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}
	

	@Test
	public void replyTweet() throws Exception {
		
		Reply reply = new Reply();
		reply.setUsername("kamalesh");
		reply.setEmail("kamaleshjc003@gmail.com");
		reply.setReply("Hello test!");
		
		this.mockMvc.perform(post("/api/v1.0/tweets/test@gmail.com/reply/62a81d1584903a587187b32c").content(asJsonString(reply))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());
	}
	
	public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
	}
}
