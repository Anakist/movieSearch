package com.movie.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	
	public List<Member> findAllByOrderByIdAsc();
	
	public List<Member> findAllByOrderByIdDesc();
	
}
