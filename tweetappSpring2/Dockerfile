# define base docker image
FROM openjdk:11
LABEL maintainer="tweetapp"
ADD target/TweetApp2-0.0.1-SNAPSHOT.jar tweetapp.jar
ENTRYPOINT ["java","-jar","tweetapp.jar"]