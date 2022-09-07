package com.tweetapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tweetapp.model.Tweet;

@Repository
public interface TweetRepository extends MongoRepository<Tweet,String> {
	
	List<Tweet> findByEmail(String email);
	
	Tweet findByEmailAndId(String email,String id);
	
	Optional<Tweet> findById(String id);

	Tweet save(Optional<Tweet> tweet);

}
