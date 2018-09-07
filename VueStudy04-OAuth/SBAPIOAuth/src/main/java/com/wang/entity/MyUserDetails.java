package com.wang.entity;

import org.springframework.security.core.userdetails.User;

import java.util.Collections;

/**
 * 自定义MyUserDetails
 * @author Wang926454
 * @date 2018/8/14 16:48
 */
public class MyUserDetails extends User {

    public MyUserDetails(com.wang.entity.User user) {
        super(user.getAccount(), user.getPassword(), true, true, true, true, Collections.EMPTY_SET);
        this.user = user;
    }

    private com.wang.entity.User user;

    public com.wang.entity.User getUser() {
        return user;
    }

    public void setUser(com.wang.entity.User user) {
        this.user = user;
    }
}
