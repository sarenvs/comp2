package com.tweetapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tweetapp.model.User;

@Repository
public interface LoginRepository extends MongoRepository<User,String>{
	
	List<User> findByEmail(String email);
	
	List<User> findByUsername(String name);
	
	List<User> findByEmailAndPassword(String email,String password);

}
