--
-- PostgreSQL database dump
--

\restrict sQ9Xo5TOUG5HIdOzXkjTHS1D4VRGfWuOrdQZH9kEAAutUSZWfVOe4xvzXOG6nKi

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-22 21:11:33

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 234 (class 1259 OID 16561)
-- Name: performance_analysis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.performance_analysis (
    analysis_id integer NOT NULL,
    test_id integer NOT NULL,
    strengths text NOT NULL,
    weaknesses text NOT NULL,
    recommendation text NOT NULL
);


ALTER TABLE public.performance_analysis OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16560)
-- Name: performance_analysis_analysis_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.performance_analysis_analysis_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.performance_analysis_analysis_id_seq OWNER TO postgres;

--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 233
-- Name: performance_analysis_analysis_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.performance_analysis_analysis_id_seq OWNED BY public.performance_analysis.analysis_id;


--
-- TOC entry 224 (class 1259 OID 16490)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id integer NOT NULL,
    domain character varying(50) NOT NULL,
    difficulty_level character varying(20) NOT NULL,
    question_text text NOT NULL,
    option_a character varying(255) NOT NULL,
    option_b character varying(255) NOT NULL,
    option_c character varying(255) NOT NULL,
    option_d character varying(255) NOT NULL,
    correct_answer character(1) NOT NULL,
    CONSTRAINT chk_correct_answer CHECK ((correct_answer = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar]))),
    CONSTRAINT chk_difficulty CHECK (((difficulty_level)::text = ANY ((ARRAY['Easy'::character varying, 'Medium'::character varying, 'Hard'::character varying])::text[])))
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16489)
-- Name: questions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_question_id_seq OWNER TO postgres;

--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_question_id_seq OWNED BY public.questions.question_id;


--
-- TOC entry 222 (class 1259 OID 16473)
-- Name: resumes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resumes (
    resume_id integer NOT NULL,
    user_id integer NOT NULL,
    file_name character varying(255) NOT NULL,
    extracted_text text,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.resumes OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16472)
-- Name: resumes_resume_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resumes_resume_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.resumes_resume_id_seq OWNER TO postgres;

--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 221
-- Name: resumes_resume_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resumes_resume_id_seq OWNED BY public.resumes.resume_id;


--
-- TOC entry 230 (class 1259 OID 16532)
-- Name: skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.skills (
    skill_id integer NOT NULL,
    skill_name character varying(100) NOT NULL
);


ALTER TABLE public.skills OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16531)
-- Name: skills_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.skills_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.skills_skill_id_seq OWNER TO postgres;

--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 229
-- Name: skills_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.skills_skill_id_seq OWNED BY public.skills.skill_id;


--
-- TOC entry 228 (class 1259 OID 16514)
-- Name: test_responses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_responses (
    response_id integer NOT NULL,
    test_id integer NOT NULL,
    question_id integer NOT NULL,
    selected_option character(1) NOT NULL,
    is_correct boolean NOT NULL,
    CONSTRAINT chk_selected_option CHECK ((selected_option = ANY (ARRAY['A'::bpchar, 'B'::bpchar, 'C'::bpchar, 'D'::bpchar])))
);


ALTER TABLE public.test_responses OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16513)
-- Name: test_responses_response_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_responses_response_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.test_responses_response_id_seq OWNER TO postgres;

--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 227
-- Name: test_responses_response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_responses_response_id_seq OWNED BY public.test_responses.response_id;


--
-- TOC entry 226 (class 1259 OID 16500)
-- Name: tests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tests (
    test_id integer NOT NULL,
    user_id integer NOT NULL,
    score integer NOT NULL,
    difficulty_level character varying(20) NOT NULL,
    test_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_score CHECK ((score >= 0)),
    CONSTRAINT chk_test_difficulty CHECK (((difficulty_level)::text = ANY ((ARRAY['Easy'::character varying, 'Medium'::character varying, 'Hard'::character varying])::text[])))
);


ALTER TABLE public.tests OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16499)
-- Name: tests_test_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tests_test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tests_test_id_seq OWNER TO postgres;

--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 225
-- Name: tests_test_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tests_test_id_seq OWNED BY public.tests.test_id;


--
-- TOC entry 232 (class 1259 OID 16543)
-- Name: user_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_skills (
    user_skill_id integer NOT NULL,
    user_id integer NOT NULL,
    skill_id integer NOT NULL
);


ALTER TABLE public.user_skills OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16542)
-- Name: user_skills_user_skill_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_skills_user_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_skills_user_skill_id_seq OWNER TO postgres;

--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 231
-- Name: user_skills_user_skill_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_skills_user_skill_id_seq OWNED BY public.user_skills.user_skill_id;


--
-- TOC entry 220 (class 1259 OID 16459)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16458)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4800 (class 2604 OID 16564)
-- Name: performance_analysis analysis_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_analysis ALTER COLUMN analysis_id SET DEFAULT nextval('public.performance_analysis_analysis_id_seq'::regclass);


--
-- TOC entry 4794 (class 2604 OID 16493)
-- Name: questions question_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN question_id SET DEFAULT nextval('public.questions_question_id_seq'::regclass);


--
-- TOC entry 4792 (class 2604 OID 16476)
-- Name: resumes resume_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resumes ALTER COLUMN resume_id SET DEFAULT nextval('public.resumes_resume_id_seq'::regclass);


--
-- TOC entry 4798 (class 2604 OID 16535)
-- Name: skills skill_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills ALTER COLUMN skill_id SET DEFAULT nextval('public.skills_skill_id_seq'::regclass);


--
-- TOC entry 4797 (class 2604 OID 16517)
-- Name: test_responses response_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_responses ALTER COLUMN response_id SET DEFAULT nextval('public.test_responses_response_id_seq'::regclass);


--
-- TOC entry 4795 (class 2604 OID 16503)
-- Name: tests test_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests ALTER COLUMN test_id SET DEFAULT nextval('public.tests_test_id_seq'::regclass);


--
-- TOC entry 4799 (class 2604 OID 16546)
-- Name: user_skills user_skill_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills ALTER COLUMN user_skill_id SET DEFAULT nextval('public.user_skills_user_skill_id_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 16462)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4999 (class 0 OID 16561)
-- Dependencies: 234
-- Data for Name: performance_analysis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.performance_analysis (analysis_id, test_id, strengths, weaknesses, recommendation) FROM stdin;
\.


--
-- TOC entry 4989 (class 0 OID 16490)
-- Dependencies: 224
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (question_id, domain, difficulty_level, question_text, option_a, option_b, option_c, option_d, correct_answer) FROM stdin;
1	Web Development	Easy	Which language is used to style web pages?	HTML	CSS	Python	Java	B
2	Python	Easy	Which keyword is used to define a function in Python?	func	define	def	function	C
\.


--
-- TOC entry 4987 (class 0 OID 16473)
-- Dependencies: 222
-- Data for Name: resumes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resumes (resume_id, user_id, file_name, extracted_text, uploaded_at) FROM stdin;
1	1	piyush_resume.pdf	Skills: HTML, CSS, JavaScript, React	2026-06-17 23:45:25.634722
2	2	rahul_resume.pdf	Skills: Python, Django, PostgreSQL	2026-06-17 23:45:25.634722
\.


--
-- TOC entry 4995 (class 0 OID 16532)
-- Dependencies: 230
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.skills (skill_id, skill_name) FROM stdin;
\.


--
-- TOC entry 4993 (class 0 OID 16514)
-- Dependencies: 228
-- Data for Name: test_responses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_responses (response_id, test_id, question_id, selected_option, is_correct) FROM stdin;
1	1	1	B	t
2	1	2	C	t
3	2	1	A	f
\.


--
-- TOC entry 4991 (class 0 OID 16500)
-- Dependencies: 226
-- Data for Name: tests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tests (test_id, user_id, score, difficulty_level, test_date) FROM stdin;
1	1	8	Easy	2026-06-17 23:48:06.295203
2	2	6	Medium	2026-06-17 23:48:06.295203
\.


--
-- TOC entry 4997 (class 0 OID 16543)
-- Dependencies: 232
-- Data for Name: user_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_skills (user_skill_id, user_id, skill_id) FROM stdin;
\.


--
-- TOC entry 4985 (class 0 OID 16459)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, full_name, email, password, created_at) FROM stdin;
1	Piyush Shukla	piyush@gmail.com	piyush123	2026-06-17 23:43:53.88019
2	Rahul Mishra	rahul@gmail.com	rahul123	2026-06-17 23:43:53.88019
\.


--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 233
-- Name: performance_analysis_analysis_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.performance_analysis_analysis_id_seq', 1, false);


--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_question_id_seq', 2, true);


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 221
-- Name: resumes_resume_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resumes_resume_id_seq', 2, true);


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 229
-- Name: skills_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.skills_skill_id_seq', 1, false);


--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 227
-- Name: test_responses_response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_responses_response_id_seq', 3, true);


--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 225
-- Name: tests_test_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tests_test_id_seq', 2, true);


--
-- TOC entry 5019 (class 0 OID 0)
-- Dependencies: 231
-- Name: user_skills_user_skill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_skills_user_skill_id_seq', 1, false);


--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, true);


--
-- TOC entry 4827 (class 2606 OID 16569)
-- Name: performance_analysis performance_analysis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_analysis
    ADD CONSTRAINT performance_analysis_pkey PRIMARY KEY (analysis_id);


--
-- TOC entry 4813 (class 2606 OID 16498)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- TOC entry 4811 (class 2606 OID 16483)
-- Name: resumes resumes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT resumes_pkey PRIMARY KEY (resume_id);


--
-- TOC entry 4819 (class 2606 OID 16539)
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skill_id);


--
-- TOC entry 4821 (class 2606 OID 16541)
-- Name: skills skills_skill_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_skill_name_key UNIQUE (skill_name);


--
-- TOC entry 4817 (class 2606 OID 16520)
-- Name: test_responses test_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_responses
    ADD CONSTRAINT test_responses_pkey PRIMARY KEY (response_id);


--
-- TOC entry 4815 (class 2606 OID 16507)
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (test_id);


--
-- TOC entry 4829 (class 2606 OID 16602)
-- Name: performance_analysis unique_test_analysis; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_analysis
    ADD CONSTRAINT unique_test_analysis UNIQUE (test_id);


--
-- TOC entry 4823 (class 2606 OID 16599)
-- Name: user_skills unique_user_skill; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT unique_user_skill UNIQUE (user_id, skill_id);


--
-- TOC entry 4825 (class 2606 OID 16549)
-- Name: user_skills user_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_pkey PRIMARY KEY (user_skill_id);


--
-- TOC entry 4807 (class 2606 OID 16471)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4809 (class 2606 OID 16469)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4836 (class 2606 OID 16570)
-- Name: performance_analysis performance_analysis_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.performance_analysis
    ADD CONSTRAINT performance_analysis_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(test_id);


--
-- TOC entry 4830 (class 2606 OID 16484)
-- Name: resumes resumes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT resumes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 4832 (class 2606 OID 16526)
-- Name: test_responses test_responses_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_responses
    ADD CONSTRAINT test_responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(question_id);


--
-- TOC entry 4833 (class 2606 OID 16521)
-- Name: test_responses test_responses_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_responses
    ADD CONSTRAINT test_responses_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(test_id);


--
-- TOC entry 4831 (class 2606 OID 16508)
-- Name: tests tests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 4834 (class 2606 OID 16555)
-- Name: user_skills user_skills_skill_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(skill_id);


--
-- TOC entry 4835 (class 2606 OID 16550)
-- Name: user_skills user_skills_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2026-06-22 21:11:34

--
-- PostgreSQL database dump complete
--

\unrestrict sQ9Xo5TOUG5HIdOzXkjTHS1D4VRGfWuOrdQZH9kEAAutUSZWfVOe4xvzXOG6nKi

