package com.wang.service;

import com.wang.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

/**
 *
 * @author Wang926454
 * @date 2018/8/9 15:44
 */
public interface IUserService extends IBaseService<User>{

    /**
     * 重写的UserDetails方法
     * @param s
     * @return org.springframework.security.core.userdetails.UserDetails
     * @author Wang926454
     * @date 2018/8/15 9:09
     */
    @Override
    UserDetails loadUserByUsername(String s) throws UsernameNotFoundException;
}
