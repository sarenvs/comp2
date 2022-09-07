package com.tweetapp.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tweets")
public class Tweet {
	
	@Id
	private String id;
    private String username;
    private String email;
    private String tweets;
    private String date;
    private int like;
    private int dislike;
    private List<Reply> replies;
    
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTweets() {
		return tweets;
	}
	public void setTweets(String tweets) {
		this.tweets = tweets;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
	public int getLike() {
		return like;
	}
	public void setLike(int like) {
		this.like = like;
	}
	
	
	
	

	public int getDislike() {
		return dislike;
	}
	public void setDislike(int dislike) {
		this.dislike = dislike;
	}
	public List<Reply> getReplies() {
		return replies;
	}
	public void setReplies(List<Reply> replies) {
		this.replies = replies;
	}
	public Tweet() {
		super();
	}
	public Tweet(String id, String username, String email, String tweets, String date, int like, int dislike,
			List<Reply> replies) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.tweets = tweets;
		this.date = date;
		this.like = like;
		this.dislike = dislike;
		this.replies = replies;
	}
	@Override
	public String toString() {
		return "Tweet [username=" + username + ", email=" + email + ", tweets=" + tweets + ", date=" + date + ", like="
				+ like + ", dislike=" + dislike + ", replies=" + replies + "]";
	}
	
	

	
	
	
	
    
    

}
