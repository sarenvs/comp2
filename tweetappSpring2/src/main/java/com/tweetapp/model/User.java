package com.tweetapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;




@Document(collection="user")
public class User {
	
	@Id
	private String id;
	
	private String username;
	
	private String password;
	
	private String email;
	
	private int age;
	
	private String sex;
	
	private int status;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public User(String id, String username, String password, String email, int age, String sex, int status) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.age = age;
		this.sex = sex;
		this.status = status;
	}

	public User() {
		super();
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", email=" + email + ", age=" + age + ", sex="
				+ sex + ", status=" + status + "]";
	}

	
	
	

	

}
