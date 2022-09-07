package com.tweetapp.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.model.Reply;
import com.tweetapp.model.Tweet;
import com.tweetapp.model.User;
import com.tweetapp.repository.LoginRepository;
import com.tweetapp.repository.TweetRepository;

@Service
public class TweetService {
	
	@Autowired
	TweetRepository tweetRepository;
	
	@Autowired
	LoginRepository loginRepository;
	
	public List<Tweet> getAllTweets() {
		
		return tweetRepository.findAll();
	}
	
	public List<Tweet> getAllTweetsByUser(String email) {
		
		return tweetRepository.findByEmail(email);
	}
	
	public String postTweet(String email,String tweetDesc) {
	
		
		tweetDesc = tweetDesc.replace("=", "");
		
		if(tweetDesc.contains("+"))
		{
			tweetDesc = tweetDesc.replace("+", " ");
		}
		List<User> userList = loginRepository.findByEmail(email);
		
		Tweet tweet = new Tweet();
		tweet.setUsername(userList.get(0).getUsername());
		tweet.setEmail(userList.get(0).getEmail());
		tweet.setTweets(tweetDesc);
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now(); 
		tweet.setDate(dtf.format(now));
		tweet.setLike(0);
		tweet.setDislike(0);
		List<Reply> replies = new ArrayList<Reply>();
		tweet.setReplies(replies);
		
		Tweet tweets = tweetRepository.save(tweet);	
		
		return tweets.getId();
	}
	
	public int likeTweet(String email,String id) {
		
		Tweet tweet = tweetRepository.findByEmailAndId(email, id);
		
		int count = tweet.getLike();
		tweet.setLike(count+1);
		tweetRepository.save(tweet);
		
		return tweet.getLike();
		
	}
	
public int disLikeTweet(String email,String id) {
		
		Tweet tweet = tweetRepository.findByEmailAndId(email, id);
		
		int count = tweet.getDislike();
		tweet.setDislike(count+1);
		tweetRepository.save(tweet);

		return tweet.getDislike();
		
	}
	
	public Tweet updateTweet(String email,String id,String tweetDesc) {
		
		
		tweetDesc = tweetDesc.replace("\"","");
		
		Tweet tweet =tweetRepository.findByEmailAndId(email, id);
		
		tweet.setTweets(tweetDesc);
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now(); 
		tweet.setDate(dtf.format(now));
		
		tweetRepository.save(tweet);
		
		return tweet;
		
	}
	
	public String deleteTweet(String email,String id) {
		Tweet tweet =tweetRepository.findByEmailAndId(email, id);
		tweetRepository.delete(tweet);
		
		return "deleted";
	}
	
	public Tweet replyTweet(String email,String id,Reply reply) {
		Tweet tweet =tweetRepository.findByEmailAndId(email, id);

		List<Reply> replies = tweet.getReplies();
        
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
		LocalDateTime now = LocalDateTime.now(); 
		reply.setDate(dtf.format(now));
		
		replies.add(reply);
		
		tweet.setReplies(replies);
		
		return tweetRepository.save(tweet);
		
	}

}
