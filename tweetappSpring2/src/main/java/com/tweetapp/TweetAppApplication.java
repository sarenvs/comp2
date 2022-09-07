package com.tweetapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("com.tweetapp.repository")
public class TweetAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TweetAppApplication.class, args);
		
	}
	

}
