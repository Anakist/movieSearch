package com.movie.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="movie_favorite")
public class Member {
	@Id
	@GeneratedValue
	@Column(name="id")
	private long id;

	@Column(name="email")
	private String email;
	
	@Column(name="pw")
	private String password;
	
	public Member() {
		
	}
	
	public Member(long id, String email, String password) {
		this.id = id;
		this.email = email;
		this.password = password;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}
