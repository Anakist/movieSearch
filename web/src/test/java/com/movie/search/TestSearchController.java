package com.movie.search;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(SpringRunner.class)
public class TestSearchController {
	
	private static final Logger LOG = LoggerFactory.getLogger(TestSearchController.class);
	private static MockMvc mvc;
	
	@BeforeClass
	public static void onBeforeClass() {
		LOG.debug("===== onBeforeClass() =====");
	}
	
	@AfterClass
	public static void onAfterClass() {
		LOG.debug("===== onAfterClass() =====");
	}
	
	@Before
	public void Before() {
		mvc = MockMvcBuilders.standaloneSetup(new SearchController()).build();
		LOG.debug("===== Before() =====");
	}
	
	@After
	public void After() {
		LOG.debug("===== After() =====");
	}
	
	@Test
	public void testMovieList() throws Exception {
		this.mvc.perform(MockMvcRequestBuilders.get("/search").accept(MediaType.TEXT_HTML))
		.andExpect(status().isOk());
	}
}
