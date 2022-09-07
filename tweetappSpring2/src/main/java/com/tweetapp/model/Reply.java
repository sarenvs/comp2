package com.tweetapp.model;

public class Reply {
	
	private String username;
	private String email;
	private String reply;
	private String date;
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
	public String getReply() {
		return reply;
	}
	public void setReply(String reply) {
		this.reply = reply;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Reply(String username, String email, String reply, String date) {
		super();
		this.username = username;
		this.email = email;
		this.reply = reply;
		this.date = date;
	}
	public Reply() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
