package com.tweetapp.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@ControllerAdvice
public class ExceptionController  extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handle(Exception ex, WebRequest request)  {
        ExceptionMessage notFoundException=
                new ExceptionMessage(new Date(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity(notFoundException,HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
