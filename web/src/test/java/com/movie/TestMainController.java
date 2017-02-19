package com.movie;

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
public class TestMainController {
	
	private static final Logger LOG = LoggerFactory.getLogger(TestMainController.class);
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
		mvc = MockMvcBuilders.standaloneSetup(new MainController()).build();
		LOG.debug("===== Before() =====");
	}
	
	@After
	public void After() {
		LOG.debug("===== After() =====");
	}
	
	@Test
	public void testMain() throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/1").accept(MediaType.TEXT_PLAIN))
		// root url. text/plain 타입을 요청 /TEXT_HTML
		.andExpect(status().isOk());
		// success : GreenBar, error : AssertionError: Status excepted
	}
}
