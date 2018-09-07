package com.wang.service.impl;

import com.wang.entity.User;
import com.wang.mapper.UserMapper;
import com.wang.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *
 * @author Wang926454
 * @date 2018/8/9 15:45
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements IUserService {
}
