# 更新日志
# 12/1 13:44 
# 为topic和topic_reply增加了anonymity	enum(‘0’, ‘1’)表示匿名与否的属性
# 其他略...

set names utf8;

drop database if exists se_system;
create database se_system CHARACTER SET utf8;

drop user if exists se_admin;
create user se_admin identified by '(>_0)';
grant all on se_system.* to se_admin;

use se_system;
create table user (
    id varchar(30) primary key,
    name varchar(10) not null,
    password varchar(16) not null,
    type set('A', 'T', 'S', 'TA') not null, # A: admin, T: teacher, S: student, TA: teacher assistant
    major_class varchar(50), # 如果type=S，账户资料页可以设置专业班级属性？
    email varchar(50),
    phone varchar(11)
) CHARACTER SET = utf8;
insert into user values ('se_admin', '(>_0)', '2333', 'A', '', '', ''),
                        ('12345678', '(>_0)', '2333', 'T', '', '', ''),
                        ('中文', '(>_0)', '2333', 'S,TA', '', '', '');

# 教师姓名，总体介绍，教学风格，以往教学，科研成果，出版书籍，所获荣誉
create table teacher (
    tea_id varchar(30),
    name varchar(10), # 感觉加上查询会方便一点。。
    intro text,
    style text, # ...
    previous_teaching text,
    research text,
    book text,
    honor text,
    primary key (tea_id),
    foreign key (tea_id)
        references user(id) on update cascade
) CHARACTER SET = utf8;

create table course (
    id int primary key AUTO_INCREMENT,
    title varchar(50) not null,
    description text,
    plan text, # 教学计划
    background text,
    assess text, # 考核
    textbook text,
    homework_intro text
) CHARACTER SET = utf8;

# 课程在不同年份不同学期的班级
create table class (
    id int AUTO_INCREMENT,
    course_id int,
    year int not null,
    semester varchar(10) not null,
    no int, # 给班级编个号？
    primary key (id, course_id),
    foreign key (course_id)
        references course(id) on update cascade
) CHARACTER SET = utf8;

# 多对多关系新建个表来表示吧。。
create table stu_class (
    stu_id varchar(30),
    class_id int,
    primary key (stu_id, class_id),
    foreign key (stu_id)
        references user(id) on update cascade,
    foreign key (class_id)
        references class(id) on update cascade
) CHARACTER SET = utf8;

create table tea_class (
    tea_id varchar(30),
    class_id int,
    primary key (tea_id, class_id),
    foreign key (tea_id)
        references user(id) on update cascade,
    foreign key (class_id)
        references class(id) on update cascade
) CHARACTER SET = utf8;

# 包括教师，学生上传的文件
create table file (
    id int AUTO_INCREMENT,
    uploader_id varchar(30) not null,
    upload_time datetime not null,
    name varchar(100) not null,
    filepath varchar(100) not null,
    mark varchar(10), # 备用...
    primary key (id),
    foreign key (uploader_id)
        references user(id) on update cascade
) CHARACTER SET = utf8;

# 以往优秀成果/参考资料/视音频资料/宣传版课件，（教学课件不和course绑定,和class绑定）
create table file_course (
    course_id int,
    file_id int,
    type set('0', '1', '2', '3', '4', '5'), # 多设几个备用...
    primary key (course_id, file_id),
    foreign key (course_id)
        references course(id) on update cascade,
    foreign key (file_id)
        references file(id) on update cascade
) CHARACTER SET = utf8;

# 课件（或者其他和class绑定的文件） 
# 课件与class是多对一关系其实可以不建表，比如在file中增加class_id属性，用mark标记是否公开
create table file_class (
    class_id int,
    file_id int,
    public enum('0', '1'), # 0 不公开 1 公开 insert操作的时候默认用1吧
    share enum('0', '1'), # 备用...也许多个班级可以共享课件0 0
    foreign key (class_id)
        references class(id) on update cascade,
    foreign key (file_id)
        references file(id) on update cascade
) CHARACTER SET = utf8;

create table homework (
    id int AUTO_INCREMENT,
    class_id int not null,
    creator_id varchar(30) not null,
    post_time datetime not null, # 后端insert用 post_time=NOW() 
    update_time datetime,
    due_time datetime not null,
    title varchar(30) not null,
    content text, # 选择题怎么建表？
    primary key (id),
    foreign key (creator_id)
        references user(id) on update cascade,
    foreign key (class_id)
        references class(id) on update cascade
) CHARACTER SET = utf8;

# 发布作业时添加的附件，与homework是多对一关系可以不建表，比如在file中增加hw_id属性
create table file_homework (
    file_id int,
    hw_id int,
    primary key (file_id, hw_id),
    foreign key (file_id)
        references file(id) on update cascade,
    foreign key (hw_id)
        references homework(id) on update cascade
) CHARACTER SET = utf8;

# 学生提交
create table submit_homework (
    hw_id int,
    stu_id varchar(30),
    file_id int, # 提交作业时的附件
    content text, # 选择题答案怎么建表
    submit_time datetime not null,
    score int, # 选择题后端或许可以把作业改了直接填分数
    comment text,
    primary key (hw_id, stu_id),
    foreign key (hw_id)
        references homework(id) on update cascade,
    foreign key (stu_id)
        references user(id) on update cascade,
    foreign key (file_id)
        references file(id) on update cascade
) CHARACTER SET = utf8;

create table announce (
    id int AUTO_INCREMENT,
    creator_id varchar(30) not null,
    post_time datetime not null,
    title varchar(50) not null,
    content text,
    update_time datetime,
    primary key (id),
    foreign key (creator_id)
        references user(id) on update cascade
) CHARACTER SET = utf8;

# 论坛里能上传附件吗0 0
create table topic (
    id int AUTO_INCREMENT,
    creator_id varchar(30) not null,
    post_time datetime not null,
    content text,
    reply_num int, # 回复数
    click_num int, # 查看次数
    anonymity enum('0', '1'), # insert默认0
    primary key (id),
    foreign key (creator_id)
        references user(id) on update cascade
) CHARACTER SET = utf8;

create table topic_reply (
    id int AUTO_INCREMENT,
    topic_id int,
    creator_id varchar(30) not null,
    post_time datetime not null,
    content text,
    anonymity enum('0', '1'), # insert默认0
    primary key (id, topic_id),
    foreign key (creator_id)
        references user(id) on update cascade,
    foreign key (topic_id)
        references topic(id) on update cascade
) CHARACTER SET = utf8;